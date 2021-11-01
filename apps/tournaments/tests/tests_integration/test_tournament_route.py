from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.players.models import Player
from apps.tournaments.models import Tournament


class TestTournamentRoute(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        call_command('loaddata', 'fixtures/test_data_users.json', verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json', verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json', verbosity=0)

        cls.user = User.objects.get(pk=1)

        cls.profile = Profile.objects.get(pk=1)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()