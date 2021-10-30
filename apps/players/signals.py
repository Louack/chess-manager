from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Player


@receiver(post_save, sender=Player)
def player_creation_handler(instance, created, **kwargs):
    if created:
        instance.creator.players_created += 1
        instance.creator.save()
        instance.player_id = instance.creator.players_created
        instance.rank = instance.creator.players_created
        instance.save()


