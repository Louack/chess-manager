from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """
    Profile instances are linked to User and records the number of tournaments
    and player created by the user. Is also used to be linked to Player and
    Tournament objects.
    """
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    tournaments_created = models.IntegerField(
        default=0,
        editable=False,
        blank=False,
        null=False
    )
    players_created = models.IntegerField(
        default=0,
        editable=False,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = 'Profil'

    def __str__(self):
        return self.user.username
