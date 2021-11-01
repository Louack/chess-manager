from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Tournament


@receiver(post_save, sender=Tournament)
def tournament_creation_handler(instance, created, **kwargs):
    if created:
        instance.creator.tournaments_created += 1
        instance.creator.save()
        instance.tournament_id = instance.creator.tournaments_created
        instance.save()
