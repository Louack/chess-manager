from django.contrib import admin

from apps.tournaments.models import Tournament


@admin.register(Tournament)
class Tournament(admin.ModelAdmin):
    list_display = (
        'tournament_id',
        'creator',
        'ready_to_start',
        'started',
        'completed'
    )
