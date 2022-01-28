from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
from dotenv import load_dotenv

from .models import Profile
from apps.players.models import Player
from apps.tournaments.models import Tournament

load_dotenv()
test_data_required = os.getenv(
    'TEST_DATA_REQUIRED', 'False'
).lower() in ('true', '1')


@receiver(post_save, sender=User)
def user_creation_handler(instance, created, **kwargs):
    """
    Creates a Profile object each time a new user is created. Adds test data,
    depending on 'TEST_DATA_REQUIRED' env variable.
    """
    if created:
        creator = Profile.objects.create(user=instance)
        if test_data_required:
            create_test_data(creator)


def create_test_data(creator):
    """
    Installs testing players and tournaments to test the app.
    """
    create_players(creator)
    create_tournaments(creator)
    play_tournament_2()


def create_players(creator):
    """
    Creates 10 test players.
    """
    for i in range(10):
        username = "test_player_" + str(i + 1)
        player = Player.objects.create(
            creator=creator,
            username=username,
            last_name='last_name',
            first_name='first_name'
        )
        player.save()


def create_tournaments(creator):
    """
    Creates 1 open tournament and 1 on-going tournament.
    """
    tournament_1 = Tournament.objects.create(
        creator=creator,
        name='test_tournament_1',
        tournament_date='2022-03-15',
    )
    tournament_1.save()

    tournament_2 = Tournament.objects.create(
        creator=creator,
        name='test_tournament_2',
        tournament_date='2022-02-10',
        players_list=[1, 2, 3, 4, 5, 6, 7, 8],
    )
    tournament_2.locked = True
    tournament_2.save()


def play_tournament_2():
    """
    Ensures to start the on-going tournament (round 1 complete and half of
    round 2).
    """
    tournament = Tournament.objects.last()
    play_tour_2_round_1(tournament)
    start_tour_2_round_2(tournament)


def play_tour_2_round_1(tournament):
    """
    Completes round 1 of tournament 2.
    """
    round_1 = tournament.round_set.first()
    matches = round_1.match_set.all()

    for match in matches:
        match.result_participant_1 = 1.0
        match.result_participant_2 = 0.0
        match.played = True
        match.save()


def start_tour_2_round_2(tournament):
    """
    Completes 2 matches of round 2 of tournament 2.
    """
    round_2 = tournament.round_set.last()
    matches = round_2.match_set.all()

    for match in matches:
        if match.number == 2:
            match.result_participant_1 = 1.0
            match.result_participant_2 = 0.0
            match.played = True
        elif match.number == 4:
            match.result_participant_1 = 0.5
            match.result_participant_2 = 0.5
            match.played = True
        match.save()
