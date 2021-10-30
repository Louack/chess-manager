from django.db import models

from apps.user_profiles.models import Profile


class Player(models.Model):
    creator = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE,
        blank=False,
        null=True
    )
    player_id = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    username = models.CharField(
        max_length=50,
        blank=False,
        null=False,
    )
    last_name = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )
    first_name = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )
    rank = models.IntegerField(
        editable=False,
        blank=True,
        null=True,
    )
    tournaments_played = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    tournaments_won = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    matches_played = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    matches_won = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    avg_place = models.FloatField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Joueur'

    def __str__(self):
        return f'Joueur {self.username}'
