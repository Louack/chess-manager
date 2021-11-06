from django.test import TestCase

from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.players.models import Player


class TestPlayerModel(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)

        cls.profile = Profile.objects.get(pk=1)

        cls.new_player = Player.objects.create(
            creator=cls.profile,
            username='new_test_player',
            last_name='last_name',
            first_name='first_name'
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_player_created(self):
        self.assertEqual(type(self.new_player), Player)

    def test_player_id(self):
        self.assertEqual(self.new_player.number, 1)

    def test_player_rank(self):
        self.assertEqual(self.new_player.rank, 1)
