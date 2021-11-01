from rest_framework import viewsets

from apps.players.models import Player
from apps.players.permissions import PlayersAccess
from apps.players.serializers import PlayerSerializer


class PlayerViewset(viewsets.ModelViewSet):
    permission_classes = [PlayersAccess]
    serializer_class = PlayerSerializer
    lookup_field = 'number'

    def get_queryset(self):
        queryset = Player.objects.filter(creator=self.request.user.profile)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context

