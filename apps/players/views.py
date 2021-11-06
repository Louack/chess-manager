from rest_framework import viewsets
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated

from apps.players.models import Player
from apps.players.permissions import PlayersAccess
from apps.players.serializers import (PlayerListSerializer,
                                      PlayerDetailSerializer)
from apps.tournaments.models import Participant
from core.pagination import CustomPagination


class PlayerViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, PlayersAccess]
    lookup_field = 'number'
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Player.objects.filter(
            creator=self.request.user.profile
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return PlayerListSerializer
        else:
            return PlayerDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context

    def destroy(self, request, *args, **kwargs):
        player = self.get_object()
        participants = [player for player in Participant.objects.filter(
            player=player
        )]
        if participants:
            raise APIException('This player is participating to at '
                               'least one tournament.')
        else:
            return super().destroy(request, *args, **kwargs)
