from rest_framework import serializers

from apps.user_profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('username', 'tournaments_created', 'players_created')

    def get_username(self, instance):
        return instance.user.username
