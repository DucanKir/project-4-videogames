from django.urls import path
from .views import GameList, GameDetail, GenresList, GenreDetail

urlpatterns = [
    path('games/', GameList.as_view()),
    path('genres/', GenresList.as_view()),
    path('games/<slug>/', GameDetail.as_view()),
    path('genres/<int:pk>/', GenreDetail.as_view())
]
