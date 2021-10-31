from django.contrib.postgres.fields import ArrayField
from django.db import models

from apps.user_profiles.models import Profile


class Tournament(models.Model):
    class Status(models.TextChoices):
        awaiting = '1', 'awaiting_players'
        can_start = '2', 'can_be_started'
        over = '3', 'tournament_over'

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
    status = models.CharField(
        editable=False,
        max_length=1,
        choices=Status.choices,
        default=Status.awaiting
    )
    players_list = ArrayField(
        models.IntegerField(
            blank=False,
            null=False
        ),
        size=8,
    )
