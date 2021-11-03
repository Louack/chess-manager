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
        base_field=models.IntegerField(
            blank=True,
        ),
        blank=True,
        default=list,
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

    def add_tournament_number(self):
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

    def handle_first_save(self):
        self.created = True
        self.check_players_list()
        self.handle_lock_at_creation()
        self.add_tournament_number()
        super().save()

    def handle_lock_at_creation(self):
        if self.locked:
            self.lock_tournament()
        else:
            super().save()

    def handle_lock_at_update(self):
        if self.locked and not self.__original_locked:
            self.lock_tournament()
        elif self.locked and self.__original_locked:
            if self.update_finished_rounds():
                super().save()
            else:
                raise APIException('A locked tournament cannot be modified')
        elif not self.locked and not self.__original_locked:
            super().save()
        else:
            raise APIException('A locked tournament cannot be modified')

    def handle_tournament_update(self):
        self.check_players_list()
        self.handle_lock_at_update()

    def lock_tournament(self):
        if len(self.players_list) == 8:
            super().save()
            self.add_participants()
            self.create_round_or_end_tournament()
        else:
            raise APIException(f'The players list is incomplete')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.created:
            self.handle_first_save()
        else:
            self.handle_tournament_update()

    def update_finished_rounds(self):
        if self.finished_rounds != self.__original_finished_rounds:
            return True

    def add_participants(self):
        for number, player_id in enumerate(self.players_list, 1):
            player = Player.objects.get(number=player_id)
            Participant.objects.create(
                number=number,
                tournament=self,
                player=player
            )


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


class Round(models.Model):
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
    finished_matches = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True
    )
    previous_pairs = ArrayField(
        base_field=ArrayField(
            base_field=models.IntegerField(
                editable=False
            ),
            editable=False,
            size=2,
            default=list,
        ),
        editable=False,
        default=list,
    )


class Match(models.Model):
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    round = models.ForeignKey(
        to=Round,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    number_participant_1 = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    result_participant_1 = models.FloatField(
        editable=False,
        blank=True,
        null=True
    )
    number_participant_2 = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    result_participant_2 = models.FloatField(
        editable=False,
        blank=True,
        null=True
    )
