from rest_framework import viewsets

from apps.tournaments.models import Tournament
from apps.tournaments.permissions import TournamentAccess
from apps.tournaments.serializers import TournamentSerializer


class TournamentViewset(viewsets.ModelViewSet):
    permission_classes = [TournamentAccess]
    serializer_class = TournamentSerializer
    lookup_field = 'tournament_id'

    def get_queryset(self):
        queryset = Tournament.objects.filter(creator=self.request.user.profile)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
