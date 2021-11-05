from rest_framework import serializers
from rest_framework.exceptions import APIException

from apps.tournaments.models import Tournament, Participant, Round, Match


class TournamentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = (
            'number',
            'tournament_name',
            'locked',
            'players_list',
            'total_rounds',
            'finished_rounds',
        )


class TournamentDetailSerializer(serializers.ModelSerializer):
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        fields = (
            'number',
            'tournament_name',
            'locked',
            'players_list',
            'total_rounds',
            'finished_rounds',
            'ranking'
        )

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


class RoundListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = (
            'number',
            'tournament',
            'finished_matches',
            'participants_pairs'
        )


class RoundDetailSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = (
            'number',
            'tournament',
            'finished_matches',
            'participants_pairs',
            'results'
        )

    @staticmethod
    def get_results(instance):
        return instance.get_matches_results()


class MatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'number',
            'tournament',
            'round',
            'played'
        )


class MatchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = fields = (
            'number',
            'tournament',
            'round',
            'played',
            'number_participant_1',
            'result_participant_1',
            'number_participant_2',
            'result_participant_2'
        )

    def update(self, instance, validated_data):
        if instance.played:
            raise APIException('A played match cannot be modified.')
        else:
            return super().update(instance, validated_data)


class ParticipantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament',
            'player'
        )


class ParticipantDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament',
            'player',
            'total_points',
            'rank'
        )
