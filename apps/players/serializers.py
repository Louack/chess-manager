from rest_framework import serializers

from apps.players.models import Player


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
    class Meta:
        model = Player
        exclude = ('id', 'creator')

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
