from django.urls import path
from .views import GameList, GameDetail

urlpatterns = [
    path('games/', GameList.as_view()),
    path('games/<int:pk>/', GameDetail.as_view())
]
