from django.test import TestCase

from django.core.management import call_command

from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.tournaments.models import Tournament


class TestTournamentModel(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)
        cls.new_tournament = Tournament.objects.create(
            creator=cls.user.profile,
            name='test_tour',
            players_list=[]
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_tournament_type(self):
        self.assertEqual(type(self.new_tournament), Tournament)
