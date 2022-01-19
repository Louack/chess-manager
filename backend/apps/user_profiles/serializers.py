from rest_framework import serializers

from apps.user_profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'username',
            'tournaments_created',
            'players_created'
        )

    @staticmethod
    def get_username(instance):
        return instance.user.username
