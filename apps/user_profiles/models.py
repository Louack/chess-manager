from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
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
        return f'Profil de {self.user.username}'

