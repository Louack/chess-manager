from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from rest_framework.exceptions import APIException

from apps.players.models import Player
from apps.user_profiles.models import Profile


class Tournament(models.Model):
    creator = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE,
        blank=False,
        null=True
    )
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    tournament_name = models.CharField(
        max_length=70,
        blank=False,
        null=False
    )
    total_rounds = models.IntegerField(
        default=4,
        editable=False
    )
    finished_rounds = models.IntegerField(
        default=0,
        editable=False
    )
    players_list = ArrayField(
        models.IntegerField(
            blank=True,
            null=True,
        ),
        size=8,
    )
    locked = models.BooleanField(
        default=False,
        blank=True,
        null=True
    )
    created = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_locked = self.locked
        self.__original_finished_rounds = self.finished_rounds

    def check_tournament_number(self):
        if not self.number:
            self.creator.tournaments_created += 1
            self.creator.save()
            self.number = self.creator.tournaments_created

    def check_players_list(self):
        players_do_not_exist = []
        previous_player_ids = []
        for player_id in self.players_list:
            if player_id in previous_player_ids:
                raise APIException(f'The same ID is present several times')
            previous_player_ids.append(player_id)
            try:
                Player.objects.get(creator=self.creator, number=player_id)
            except ObjectDoesNotExist:
                players_do_not_exist.append(player_id)
        if players_do_not_exist:
            raise APIException(f'The following player IDs do not exist: {players_do_not_exist}')

    def create_round_or_end_tournament(self):
        if self.finished_rounds <= self.total_rounds:
            pass
        else:
            pass

    def lock_tournament(self):
        if len(self.players_list) == 8:
            super().save()
            self.update_participants(save=True)
            self.create_round_or_end_tournament()
        else:
            raise APIException(f'The players list is incomplete')

    def update_participants(self, save=False, delete=False):
        for number, player_id in enumerate(self.players_list, 1):
            player = Player.objects.get(number=player_id)
            if save:
                Participant.objects.create(
                    number=number,
                    tournament=self,
                    player=player
                )
            if delete:
                Participant.objects.get(player=player, tournament=self).delete()

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.locked:
            self.created = True
            self.check_tournament_number()
            self.check_players_list()
            super().save()
        elif not self.created and self.locked:
            self.created = True
            self.check_tournament_number()
            self.check_players_list()
            self.lock_tournament()
        elif self.created and self.locked and self.locked != self.__original_locked:
            self.check_players_list()
            self.lock_tournament()
        elif self.created and self.locked and self.locked == self.__original_locked:
            if self.update_finished_rounds():
                super().save()
            else:
                raise APIException('A locked tournament cannot be modified')

    def update_finished_rounds(self):
        if self.finished_rounds != self.__original_finished_rounds:
            return True

    def delete(self, using=None, keep_parents=False):
        if self.locked:
            self.update_participants(delete=True)
        return super().delete()


class Participant(models.Model):
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    tournament = models.ForeignKey(
        to=Tournament,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    player = models.ForeignKey(
        to=Player,
        on_delete=models.PROTECT,
        editable=False,
        blank=False,
        null=False
    )
