from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Tournament
from apps.players.models import Player


@receiver(post_save, sender=Tournament)
def tournament_creation_handler(instance, created, **kwargs):
    if created:
        instance.creator.tournaments_created += 1
        instance.creator.save()
        instance.tournament_id = instance.creator.tournaments_created
        instance.save()


@receiver(post_save, sender=Tournament)
def tournament_status_handler(instance, **kwargs):
    if instance.status == '1' and len(instance.players_list) == 8:
        players_list_valid = check_players_list(instance)
        if players_list_valid:
            instance.status = '2'
            instance.save()


def check_players_list(instance):
    for player_id in instance.players_list:
        try:
            Player.objects.get(player_id=player_id)
        except ObjectDoesNotExist:
            return False
    return True




