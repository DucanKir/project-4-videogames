from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import Http404
from .permissions import IsOwnerOrReadOnly

from .serializers import GameSerializer, PopulatedGameSerializer
from .models import Game

# Create your views here.
class GameList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)
    PAGE_SIZE = 8

    def get(self, request):
        page = int(request.query_params.get('page', 0))
        games = Game.objects.all()[self.PAGE_SIZE*page: self.PAGE_SIZE*(page+1)]

        serializer = PopulatedGameSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class GameDetail(APIView):


    permission_classes = (IsOwnerOrReadOnly,)

    def get_game(self, pk):
        try:
            game = Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise Http404

        return game

    def get(self, _request, pk):
        game = self.get_game(pk)
        serializer = PopulatedGameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk):
        game = self.get_game(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        game = self.get_game(pk)
        game.delete()
        return Response(status=204)
