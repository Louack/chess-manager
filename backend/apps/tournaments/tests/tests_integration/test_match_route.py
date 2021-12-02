from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.management import call_command
from apps.user_profiles.models import Profile
from django.contrib.auth.models import User


class TestMatchRoute(APITestCase):
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
        call_command('loaddata', 'fixtures/test_data_matches.json',
                     verbosity=0)

        cls.user = User.objects.get(pk=1)
        cls.profile = Profile.objects.get(pk=1)

        cls.match_put_form_success = {
            "played": True,
            "result_participant_1": 0.5,
            "result_participant_2": 0.5
        }
        cls.match_put_form_not_float = {
            "played": True,
            "result_participant_1": "",
            "result_participant_2": 0.5
        }
        cls.match_put_form_sum_not_1 = {
            "played": True,
            "result_participant_1": 1,
            "result_participant_2": 0.5
        }

        cls.open_kwargs_list = {
            "tournament_number": 2,
            "round_number": 1
        }
        cls.open_kwargs_detail = {
            "tournament_number": 2,
            "round_number": 1,
            "number": 1
        }
        cls.locked_kwargs = {
            "tournament_number": 2,
            "round_number": 1,
            "number": 2
        }

    @classmethod
    def tearDownClass(cls):
        pass


class TestOpenMatchRoute(TestMatchRoute):
    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_matches_list(self):
        response = self.client.get(reverse('matches-list',
                                           kwargs=self.open_kwargs_list))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_matches_retrieve(self):
        response = self.client.get(reverse('matches-detail',
                                           kwargs=self.open_kwargs_detail))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_matches_post(self):
        response = self.client.post(reverse('matches-list',
                                            kwargs=self.open_kwargs_list),
                                    data={})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_matches_put_success(self):
        response = self.client.put(reverse('matches-detail',
                                           kwargs=self.open_kwargs_detail),
                                   data=self.match_put_form_success)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_matches_put_sum_not_1(self):
        response = self.client.put(reverse('matches-detail',
                                           kwargs=self.open_kwargs_detail),
                                   data=self.match_put_form_sum_not_1)
        self.assertIn(b'Points sum must be equal to 1.', response.content)

    def test_matches_put_not_float(self):
        response = self.client.put(reverse('matches-detail',
                                           kwargs=self.open_kwargs_detail),
                                   data=self.match_put_form_not_float)
        self.assertIn(b'Results must be entered before locking.',
                      response.content)

    def test_matches_delete(self):
        response = self.client.delete(reverse('matches-detail',
                                              kwargs=self.open_kwargs_detail))
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)


class TestLockedMatchRoute(TestMatchRoute):
    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_matches_already_played(self):
        response = self.client.put(reverse('matches-detail',
                                           kwargs=self.locked_kwargs),
                                   data=self.match_put_form_success)
        self.assertIn(b'A played match cannot be modified.', response.content)
