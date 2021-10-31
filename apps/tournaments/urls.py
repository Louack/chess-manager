from rest_framework.routers import DefaultRouter
from .views import TournamentViewset

router_tournaments = DefaultRouter()
router_tournaments.register(r'', TournamentViewset, basename='tournaments')

urlpatterns = [
    router_tournaments.urls
]
