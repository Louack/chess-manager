from rest_framework import viewsets

from apps.tournaments.models import Tournament, Participant
from apps.tournaments.permissions import TournamentAccess, ParticipantAccess
from apps.tournaments.serializers import TournamentSerializer, ParticipantSerializer


class TournamentViewset(viewsets.ModelViewSet):
    permission_classes = [TournamentAccess]
    serializer_class = TournamentSerializer
    lookup_field = 'number'

    def get_queryset(self):
        queryset = Tournament.objects.filter(creator=self.request.user.profile)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context


class ParticipantViewset(viewsets.ModelViewSet):
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [ParticipantAccess]
    serializer_class = ParticipantSerializer
    lookup_field = 'number'

    def get_queryset(self):
        tour_number = self.kwargs['tournament_number']
        tournament = Tournament.objects.get(number=tour_number)
        queryset = Participant.objects.filter(tournament=tournament)
        return queryset
