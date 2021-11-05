from rest_framework import viewsets
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import APIException

from apps.tournaments.models import (Tournament,
                                     Participant,
                                     Round,
                                     Match)
from apps.tournaments.permissions import (TournamentAccess,
                                          ParticipantAccess,
                                          RoundAccess,
                                          MatchAccess)
from apps.tournaments.serializers import (TournamentListSerializer,
                                          TournamentDetailSerializer,
                                          RoundListSerializer,
                                          RoundDetailSerializer,
                                          MatchListSerializer,
                                          MatchDetailSerializer,
                                          ParticipantListSerializer,
                                          ParticipantDetailSerializer)
from core.pagination import CustomPagination


class ChessBaseViewset(viewsets.ModelViewSet):
    tournament = None
    round_obj = None

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

    def get_round(self):
        round_number = self.kwargs['round_number']
        try:
            round_obj = Round.objects.get(
                tournament=self.tournament,
                number=round_number
            )
        except ObjectDoesNotExist:
            raise APIException('This round does not exist')
        return round_obj


class TournamentViewset(viewsets.ModelViewSet):
    permission_classes = [TournamentAccess]
    lookup_field = 'number'
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Tournament.objects.filter(
            creator=self.request.user.profile
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return TournamentListSerializer
        else:
            return TournamentDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context


class RoundViewset(ChessBaseViewset):
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [RoundAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Round.objects.filter(
            tournament=self.tournament
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return RoundListSerializer
        else:
            return RoundDetailSerializer


class MatchViewset(ChessBaseViewset):
    http_method_names = ['get', 'put', 'patch', 'head', 'options', 'trace']
    permission_classes = [MatchAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
            self.round_obj = self.get_round()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Match.objects.filter(
            tournament=self.tournament,
            round=self.round_obj
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return MatchListSerializer
        else:
            return MatchDetailSerializer


class ParticipantViewset(ChessBaseViewset):
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [ParticipantAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Participant.objects.filter(
            tournament=self.tournament
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return ParticipantListSerializer
        else:
            return ParticipantDetailSerializer
