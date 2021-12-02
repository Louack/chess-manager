from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User


class TestTournamentRoute(APITestCase):
    @classmethod
    def setUpClass(cls):
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)

        cls.post_form = {
            "name": "test_tournament",
            "players_list": [],
            "tournament_date": "2021-11-06"
        }

        cls.put_form_wo_lock = {
            "name": "modified_test_tournament",
            "players_list": [1, 2, 3, 4, 5, 6, 7, 8]
        }

        cls.put_form_wo_lock_wrong_player = {
            "name": "modified_test_tournament",
            "players_list": [11]
        }

        cls.put_form_wo_lock_same_player = {
            "name": "modified_test_tournament",
            "players_list": [1, 1]
        }

        cls.put_form_with_lock_good_list = {
            "name": "modified_test_tournament",
            "players_list": [1, 2, 3, 4, 5, 6, 7, 8],
            "tournament_date": "2021-11-06",
            "locked": True
        }

        cls.put_form_with_lock_bad_list = {
            "name": "modified_test_tournament",
            "players_list": [1, 2, 3, 4, 5, 6, 7],
            "locked": True
        }

        cls.open_kwargs = {"number": 1}
        cls.locked_kwargs = {"number": 2}

    @classmethod
    def tearDownClass(cls):
        pass


class TestOpenTournamentRoute(TestTournamentRoute):
    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_tournament_list(self):
        response = self.client.get(reverse('tournaments-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_tournament_retrieve(self):
        response = self.client.get(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_tournament_post(self):
        response = self.client.post(reverse('tournaments-list'),
                                    data=self.post_form)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_tournament_put_without_lock(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs),
                                   data=self.put_form_wo_lock)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_tournament_put_without_lock_player_not_found(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs),
                                   data=self.put_form_wo_lock_wrong_player)
        self.assertIn(b'The following player IDs do not exist',
                      response.content)

    def test_tournament_put_without_lock_same_player(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs),
                                   data=self.put_form_wo_lock_same_player)
        self.assertIn(b'The same ID is present several times',
                      response.content)

    def test_tournament_put_with_lock_good_list(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs),
                                   data=self.put_form_with_lock_good_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_tournament_put_with_lock_incomplete_list(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.open_kwargs),
                                   data=self.put_form_with_lock_bad_list)
        self.assertIn(b'The players list is incomplete', response.content)

    def test_tournament_delete(self):
        response = self.client.delete(reverse('tournaments-detail',
                                              kwargs=self.open_kwargs))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestLockedTournamentRoute(TestTournamentRoute):
    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_locked_tournament_post(self):
        response = self.client.post(reverse('tournaments-list'),
                                    data=self.put_form_with_lock_good_list)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_locked_tournament_edit(self):
        response = self.client.put(reverse('tournaments-detail',
                                           kwargs=self.locked_kwargs),
                                   data=self.post_form)
        self.assertIn(b'A locked tournament cannot be modified',
                      response.content)
