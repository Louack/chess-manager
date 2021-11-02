from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import TournamentViewset, ParticipantViewset

router_tournaments = SimpleRouter()
router_tournaments.register(
    r'tournaments',
    TournamentViewset,
    basename='tournaments')

router_participants = NestedSimpleRouter(
    router_tournaments,
    r'tournaments',
    lookup='tournament'
)
router_participants.register(
    r'participants',
    ParticipantViewset,
    basename='participants'
)

urlpatterns = [
    path(r'', include(router_tournaments.urls), name='tournaments'),
    path(r'', include(router_participants.urls), name='participants')
]
