from rest_framework import serializers
from rest_framework.exceptions import APIException

from apps.tournaments.models import Tournament, Participant


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
            locked=validated_data['locked']
        )
        return tournament

    def update(self, instance, validated_data):
        if instance.locked:
            raise APIException('A locked tournament cannot be modified')
        else:
            return super().update(instance, validated_data)


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
