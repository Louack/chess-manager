from rest_framework import generics
from .permissions import ProfileAccess

from .models import Profile
from ..user_profiles.serializers import ProfileSerializer


class ProfileView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [ProfileAccess]

    def get_queryset(self):
        queryset = Profile.objects.filter(user=self.request.user)
        return queryset
