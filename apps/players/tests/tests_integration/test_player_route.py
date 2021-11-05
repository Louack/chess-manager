

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from django.contrib.auth.models import User


class TestPlayerRoute(APITestCase):
    @classmethod
    def setUpClass(cls):
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_participants.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)

        cls.player_post_form = {
            'username': 'test_player',
            'first_name': 'test_fname',
            'last_name': 'test_lname'
        }
        cls.player_put_form = {
            'username': 'modified_player',
            'first_name': 'modified_fname',
            'last_name': 'modified_lname'
        }
        cls.kwargs = {'number': 1}

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_player_list(self):
        response = self.client.get(reverse('players-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_player_retrieve(self):
        response = self.client.get(reverse('players-detail',
                                           kwargs=self.kwargs))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_player_post(self):
        response = self.client.post(reverse('players-list'),
                                    data=self.player_post_form)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_player_put(self):
        response = self.client.put(reverse('players-detail',
                                           kwargs=self.kwargs),
                                   data=self.player_put_form)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_player_delete_success(self):
        response = self.client.delete(reverse('players-detail',
                                              kwargs={"number": 10}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_player_delete_fail(self):
        response = self.client.delete(reverse('players-detail',
                                              kwargs=self.kwargs))
        self.assertIn(b'This player is participating to at '
                      b'least one tournament.',
                      response.content)
