from rest_framework import serializers
from rest_framework.exceptions import APIException

from apps.tournaments.models import Tournament, Participant, Round, Match


class TournamentSerializer(serializers.ModelSerializer):
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        fields = '__all__'

    @staticmethod
    def get_ranking(instance):
        return instance.get_ranking()

    def create(self, validated_data):
        creator = self.context['profile']

        if 'players_list' in validated_data.keys():
            tournament = Tournament.objects.create(
                creator=creator,
                tournament_name=validated_data['tournament_name'],
                players_list=validated_data['players_list'],
                locked=validated_data['locked']
            )
        else:
            tournament = Tournament.objects.create(
                creator=creator,
                tournament_name=validated_data['tournament_name'],
                locked=validated_data['locked']
            )
        return tournament

    def update(self, instance, validated_data):
        if instance.locked:
            raise APIException('A locked tournament cannot be modified')
        else:
            return super().update(instance, validated_data)


class RoundSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = '__all__'

    @staticmethod
    def get_results(instance):
        return instance.get_matches_results()


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

    def update(self, instance, validated_data):
        if instance.played:
            raise APIException('A played match cannot be modified.')
        else:
            return super().update(instance, validated_data)


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
