from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import (TournamentViewset,
                    ParticipantViewset,
                    RoundViewset,
                    MatchViewset)

router_tournaments = SimpleRouter()
router_tournaments.register(
    r'tournaments',
    TournamentViewset,
    basename='tournaments')

router_rounds = NestedSimpleRouter(
    router_tournaments,
    r'tournaments',
    lookup='tournament'
)
router_rounds.register(
    r'rounds',
    RoundViewset,
    basename='rounds'
)

router_matches = NestedSimpleRouter(
    router_rounds,
    r'rounds',
    lookup='round'
)
router_matches.register(
    r'matches',
    MatchViewset,
    basename='matches'
)

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
    path(r'', include(router_rounds.urls), name='rounds'),
    path(r'', include(router_matches.urls), name='matches'),
    path(r'', include(router_participants.urls), name='participants')
]
