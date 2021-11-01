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
    tournament_id = models.IntegerField(
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
    ready_to_start = models.BooleanField(
        default=False,
        blank=True,
        null=True
    )
    started = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )
    completed = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_started = self.started

    def check_ready_to_start(self):
        invalid_players = self.check_players_list()
        if invalid_players:
            raise APIException(f'The following player IDs do not exist: {invalid_players}')
        else:
            if self.ready_to_start and len(self.players_list) != 8:
                raise APIException(f'The players list is incomplete')
            elif self.ready_to_start and len(self.players_list) == 8:
                self.started = True
                super().save()
            else:
                super().save()

    def check_players_list(self):
        players_do_not_exist = []
        for player_id in self.players_list:
            try:
                Player.objects.get(player_id=player_id)
            except ObjectDoesNotExist:
                players_do_not_exist.append(player_id)
        return players_do_not_exist

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.started or self.started != self.__original_started:
            self.check_ready_to_start()
        else:
            self.check_ready_to_start()

