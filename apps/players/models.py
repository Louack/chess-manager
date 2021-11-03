from django.db import models

from apps.user_profiles.models import Profile


class Player(models.Model):
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
        verbose_name = 'Player'

    def __str__(self):
        return self.username

    def check_player_number_and_rank(self):
        if not self.number and not self.rank:
            self.creator.players_created += 1
            self.creator.save()
            self.number = self.creator.players_created
            self.rank = self.creator.players_created

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self.check_player_number_and_rank()
        super().save()

