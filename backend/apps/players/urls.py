from rest_framework.routers import DefaultRouter

from .views import PlayerViewset

router_players = DefaultRouter()
router_players.register(r'', PlayerViewset, basename='players')

urlpatterns = [
    router_players.urls
]
