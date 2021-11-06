from django.urls import path

from apps.user_profiles.views import ProfileView

urlpatterns = [
    path('', ProfileView.as_view())
]
