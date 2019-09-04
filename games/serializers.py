from rest_framework  import serializers
from jwt_auth.serializers import UserSerializer

from .models import Game, Genre, Platform

class GenreSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Genre
        fields = ('id', 'name', 'user')

class PlatformSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Platform
        fields = ('id', 'name', 'user')

class GameSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Game
        fields = ('id', 'released', 'name', 'rating', 'slug', 'genres', 'background_image', 'ratings_count', 'user', 'platforms',)

class PopulatedGameSerializer(GameSerializer):

    genres = GenreSerializer(many=True)
    platforms = PlatformSerializer(many=True)
