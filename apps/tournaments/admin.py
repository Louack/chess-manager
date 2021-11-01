from django.contrib import admin

from apps.tournaments.models import Tournament, Participant


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'number',
        'creator',
        'ready_to_start',
        'started',
        'completed'
    )


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = (
        'number',
        'tournament',
        'player'
    )
