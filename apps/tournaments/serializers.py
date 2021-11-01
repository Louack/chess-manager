from rest_framework import serializers
from rest_framework.exceptions import APIException

from apps.tournaments.models import Tournament


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

    def create(self, validated_data):
        creator = self.context['profile']

        tournament = Tournament.objects.create(
            creator=creator,
            tournament_name=validated_data['tournament_name'],
            players_list=validated_data['players_list'],
            ready_to_start=validated_data['ready_to_start']
        )
        return tournament

    def update(self, instance, validated_data):
        if instance.started:
            raise APIException('An on-going or completed tournament cannot be modified')
        else:
            return super().update(instance, validated_data)
