from django.urls import path

from apps.user_profiles.views import ProfileView

# /api/profile/
urlpatterns = [
    path('', ProfileView.as_view())
]
