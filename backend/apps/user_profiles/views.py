from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .permissions import ProfileAccess

from .models import Profile
from ..user_profiles.serializers import ProfileSerializer


class ProfileView(generics.ListAPIView):
    """
    View managing a CRUD profile. Only 'read' is allowed.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, ProfileAccess]

    def get_queryset(self):
        queryset = Profile.objects.filter(user=self.request.user)
        return queryset
