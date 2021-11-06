from django.test import TestCase
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.players.models import Player


class TestPlayerModel(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = User.objects.create(
            username='test_profile_user',
            password='test_user_password'
        )

        cls.profile = Profile.objects.get(user=cls.user)

        cls.player = Player.objects.create(
            creator=cls.profile,
            username='test_player',
            last_name='last_name',
            first_name='first_name'
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_profile_creation(self):
        self.assertEqual(type(self.profile), Profile)

    def test_player_count_updated(self):
        self.assertEqual(self.profile.players_created, 1)
