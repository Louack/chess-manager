from rest_framework import viewsets
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import APIException

from apps.tournaments.models import Tournament, Participant
from apps.tournaments.permissions import TournamentAccess, ParticipantAccess
from apps.tournaments.serializers import TournamentSerializer, ParticipantSerializer


class ChessBaseViewset(viewsets.ModelViewSet):
    tournament = None
    round = None

    def get_tournament(self):
        tournament_number = self.kwargs['tournament_number']
        try:
            tournament = Tournament.objects.get(
                creator=self.request.user.profile,
                number=tournament_number
            )
        except ObjectDoesNotExist:
            raise APIException('This tournament does not exist')
        return tournament

    # def get_round(self):
    #     round_number = self.kwargs['round_number']
    #     try:
    #         round = Round.objects.get(
    #             tournament=self.tournament,
    #             number=round_number
    #         )
    #     except ObjectDoesNotExist:
    #         raise APIException('This round does not exist')
    #     return round


class TournamentViewset(viewsets.ModelViewSet):
    permission_classes = [TournamentAccess]
    serializer_class = TournamentSerializer
    lookup_field = 'number'

    def get_queryset(self):
        queryset = Tournament.objects.filter(
            creator=self.request.user.profile
        )
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context


class ParticipantViewset(ChessBaseViewset):
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [ParticipantAccess]
    serializer_class = ParticipantSerializer
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Participant.objects.filter(
            tournament=self.tournament
        )
        return queryset
