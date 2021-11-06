from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class TestRegistration(APITestCase):
    def test_registration_success(self):
        response = self.client.post(reverse('registration'),
                                    data={'username': 'registration_user',
                                          'password': 'test_password',
                                          'password2': 'test_password'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_registration_username_exists(self):
        response = self.client.post(reverse('registration'),
                                    data={'username': 'test_user',
                                          'password': 'test_password',
                                          'password2': 'test_password'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("A user with that username already exists.",
                      response.content.decode('utf-8'))

    def test_registration_password_not_matching(self):
        response = self.client.post(reverse('registration'),
                                    data={'username': 'registration_user',
                                          'password': 'test_password',
                                          'password2': 'not_matching'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Passwords are not matching.",
                      response.content.decode('utf-8'))
