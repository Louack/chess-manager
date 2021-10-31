from rest_framework import serializers

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
        )

        tournament.save()
        return tournament
