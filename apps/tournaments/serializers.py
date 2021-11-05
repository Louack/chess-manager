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
        if instance.locked:
            ranking = dict()
            sorted_participants = instance.sort_participants()
            for place, participant in enumerate(sorted_participants, 1):
                ranking[place] = {
                    "participant": participant.number,
                    "total points": participant.total_points,
                    "rank": participant.rank
                }
            return ranking
        else:
            return "This tournament is not started."

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
            'finished_matches',
            'participants_pairs'
        )


class RoundDetailSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = (
            'number',
            'finished_matches',
            'participants_pairs',
            'results'
        )

    @staticmethod
    def get_results(instance):
        results = dict()
        matches = [match for match in instance.match_set.all()]
        for match in matches:
            participant_1 = Participant.objects.get(
                number=match.number_participant_1,
                tournament=instance.tournament
            )
            participant_2 = Participant.objects.get(
                number=match.number_participant_2,
                tournament=instance.tournament
            )
            results[match.number] = {
                "participant 1": {
                    "username": participant_1.player.username,
                    "point": match.result_participant_1
                },
                "participant 2": {
                    "username": participant_2.player.username,
                    "point": match.result_participant_2
                }
            }
        return results


class MatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'number',
            'played'
        )


class MatchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = fields = (
            'number',
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
    tournament_number = serializers.SerializerMethodField()
    player_number = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament_number',
            'player_number',
            'rank'
        )

    @staticmethod
    def get_tournament_number(instance):
        return instance.tournament.number

    @staticmethod
    def get_player_number(instance):
        return instance.player.number


class ParticipantDetailSerializer(ParticipantListSerializer):
    username = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament_number',
            'player_number',
            'username',
            'last_name',
            'first_name',
            'total_points',
            'rank'
        )

    @staticmethod
    def get_username(instance):
        return instance.player.username

    @staticmethod
    def get_last_name(instance):
        return instance.player.last_name

    @staticmethod
    def get_first_name(instance):
        return instance.player.first_name
