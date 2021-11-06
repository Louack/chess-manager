from django.test import TestCase

from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User
from apps.players.models import Player
from apps.tournaments.models import Tournament, Participant


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
        cls.player = Player.objects.get(pk=1)
        cls.tournament = Tournament.objects.get(pk=1)
        cls.participant = Participant.objects.create(
            number=1,
            tournament=cls.tournament,
            player=cls.player
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_participant_type(self):
        self.assertEqual(type(self.participant), Participant)
