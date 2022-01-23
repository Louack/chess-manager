from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile


@receiver(post_save, sender=User)
def user_creation_handler(instance, created, **kwargs):
    """
    Creates a Profile object each time a new user is created.
    """
    if created:
        Profile.objects.create(user=instance)
