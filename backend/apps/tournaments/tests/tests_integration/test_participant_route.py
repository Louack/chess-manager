from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User


class TestParticipantRoute(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        call_command('loaddata', 'fixtures/test_data_users.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_players.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_tournaments.json',
                     verbosity=0)
        call_command('loaddata', 'fixtures/test_data_participants.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)
        cls.kwargs_detail = {
            "tournament_number": 2,
            "number": 1
        }
        cls.kwargs_list = {
            "tournament_number": 2
        }

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_participants_list(self):
        response = self.client.get(reverse('participants-list',
                                           kwargs=self.kwargs_list))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_participants_retrieve(self):
        response = self.client.get(reverse('participants-detail',
                                           kwargs=self.kwargs_detail))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_participants_post(self):
        response = self.client.post(reverse('participants-list',
                                            kwargs=self.kwargs_list),
                                    data={})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_participants_put(self):
        response = self.client.put(reverse('participants-detail',
                                           kwargs=self.kwargs_detail),
                                   data={})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_participants_delete(self):
        response = self.client.delete(reverse('participants-detail',
                                              kwargs=self.kwargs_detail))
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
