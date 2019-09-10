from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import Http404
from .permissions import IsOwnerOrReadOnly

from .serializers import GameSerializer, PopulatedGameSerializer, GenreSerializer, PopulatedGenreSerializer
from .models import Game, Genre

# Create your views here.
class GameList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)
    PAGE_SIZE = 8

    def get(self, request):
        page = int(request.query_params.get('page', 0))
        genre_id = int(request.query_params.get('genre', 0))

        if not genre_id:
            games = Game.objects.all()

        else:
            games = Game.objects.filter(genres__id=genre_id)

        serializer = PopulatedGameSerializer(games[self.PAGE_SIZE*page: self.PAGE_SIZE*(page+1)], many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class GameDetail(APIView):


    permission_classes = (IsOwnerOrReadOnly,)

    def get_game(self, slug):
        try:
            game = Game.objects.get(slug=slug)
        except Game.DoesNotExist:
            raise Http404

        return game

    def get(self, _request, slug):
        game = self.get_game(slug)
        serializer = PopulatedGameSerializer(game)
        return Response(serializer.data)

    def put(self, request, slug):
        game = self.get_game(slug)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, slug):
        game = self.get_game(slug)
        game.delete()
        return Response(status=204)

class GenresList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)
    PAGE_SIZE = 50

    def get(self, request):
        page = int(request.query_params.get('page', 0))
        genres = Genre.objects.all()[self.PAGE_SIZE*page: self.PAGE_SIZE*(page+1)]
        serializer = PopulatedGenreSerializer(genres, many=True)
        return Response(serializer.data)

class GenreDetail(APIView):

    PAGE_SIZE = 8

    def get(self, request, pk):
        page = int(request.query_params.get('page', 0))
        genre = Genre.objects.get(pk=pk)

        serializer = PopulatedGenreSerializer(genre)
        data = serializer.data

        data['games'] = data['games'][self.PAGE_SIZE*page: self.PAGE_SIZE*(page+1)]
        return Response(data)
