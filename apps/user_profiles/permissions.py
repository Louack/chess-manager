from rest_framework.permissions import BasePermission


class ProfileAccess(BasePermission):
    def has_permission(self, request, view):
        if hasattr(request.user, 'profile'):
            return True

    def has_object_permission(self, request, view, obj):
        if obj.user == request.user:
            return True
