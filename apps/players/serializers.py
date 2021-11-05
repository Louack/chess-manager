from rest_framework import serializers

from apps.players.models import Player
from apps.tournaments.models import Participant


class PlayerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'number',
            'username',
            'last_name',
            'first_name',
            'rank'
        )


class PlayerDetailSerializer(serializers.ModelSerializer):
    tournaments_list = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = (
            'number',
            'username',
            'last_name',
            'first_name',
            'rank',
            'avg_place',
            'tournaments_played',
            'tournaments_won',
            'matches_played',
            'matches_won',
            'tournaments_list',
            'date_created',
        )

    @staticmethod
    def get_tournaments_list(instance):
        tournaments = [
            participant.tournament.number for participant in
            Participant.objects.filter(player=instance)
        ]
        return tournaments

    def create(self, validated_data):
        creator = self.context['profile']
        player = Player.objects.create(
            creator=creator,
            username=validated_data['username'],
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name']
        )
        player.save()
        return player
