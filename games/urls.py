from django.urls import path
from .views import GameList, GameDetail, GenresList, GenreDetail, PlatformsList, PlatformDetail

urlpatterns = [
    path('games/', GameList.as_view()),
    path('genres/', GenresList.as_view()),
    path('platforms/', PlatformsList.as_view()),
    path('games/<slug>/', GameDetail.as_view()),
    path('genres/<name>/', GenreDetail.as_view()),
    path('platforms/<name>/', PlatformDetail.as_view())
]
