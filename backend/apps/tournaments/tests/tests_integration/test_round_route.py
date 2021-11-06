from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User


class TestRoundRoute(APITestCase):
    @classmethod
    def setUpClass(cls):
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_rounds.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)

        cls.list_kwargs = {
            "tournament_number": 2
        }
        cls.detail_kwargs = {
            "tournament_number": 2,
            "number": 1
        }

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_round_list(self):
        response = self.client.get(reverse('rounds-list',
                                           kwargs=self.list_kwargs))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_round_retrieve(self):
        response = self.client.get(reverse('rounds-detail',
                                           kwargs=self.detail_kwargs))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_round_post(self):
        response = self.client.post(reverse('rounds-list',
                                            kwargs=self.list_kwargs),
                                    data={})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_round_put(self):
        response = self.client.put(reverse('rounds-detail',
                                           kwargs=self.detail_kwargs),
                                   data={})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_round_delete(self):
        response = self.client.delete(reverse('rounds-detail',
                                              kwargs=self.detail_kwargs))
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
