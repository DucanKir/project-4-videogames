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

    def get(self, _request):
        games = Game.objects.all()
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
