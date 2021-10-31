from django.test import TestCase

from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.players.models import Player


class TestPlayerModel(TestCase):
    @classmethod
    def setUpClass(cls):
        call_command('loaddata', 'fixtures/test_data_users.json', verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json', verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)
        cls.new_player = Player.objects.create(
            creator=cls.profile,
            username='test_player',
            last_name='last_name',
            first_name='first_name'
        )

    @classmethod
    def tearDownClass(cls):
        pass

    def test_player_created(self):
        self.assertEqual(type(self.new_player), Player)

    def test_player_id(self):
        self.assertEqual(self.new_player.player_id, 2)

    def test_player_rank(self):
        self.assertEqual(self.new_player.rank, 2)
