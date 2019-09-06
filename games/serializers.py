from rest_framework  import serializers
from jwt_auth.serializers import UserSerializer

from .models import Game, Genre, Platform, Screenshot, Clip, Store, Requirement

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


class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = ('id', 'image', 'game',)


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'store', 'url_en',)


class ClipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clip
        fields = ('id', 'clip', 'game',)

class RequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ('id', 'minimum', 'recomended', 'game')


class GameSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    short_screenshots = ScreenshotSerializer(many=True)
    requirements = RequirementsSerializer(many=True)

    class Meta:
        model = Game
        fields = ('id', 'released', 'name', 'rating', 'slug', 'genres', 'background_image', 'ratings_count', 'user', 'platforms', 'short_screenshots', 'playtime', 'clip', 'stores', 'description', 'requirements')


class PopulatedGameSerializer(GameSerializer):

    genres = GenreSerializer(many=True)
    platforms = PlatformSerializer(many=True)
    clip = ClipSerializer(many=True)
    stores = StoreSerializer(many=True)


class GameDeserializer(serializers.ModelSerializer):

    short_screenshots = ScreenshotSerializer(many=True)
    clip = ClipSerializer()

    class Meta:
        model = Game
        fields = '__all__'


    def create(self, validated_data):
        screenshots_data = validated_data.pop('short_screenshots')
        stores_data = validated_data.pop('stores')
        requirements_data = validated_data.pop('requirements')
        clip_data = validated_data.pop('clip')
        genres = validated_data.pop('genres')
        platforms = validated_data.pop('platforms')
        game = Game.objects.create(**validated_data)
        game.genres.set(genres)
        game.platforms.set(platforms)
        game.stores.set(stores_data)
        Clip.objects.create(game=game, **clip_data)
        for screenshot_data in screenshots_data:
            Screenshot.objects.create(game=game, **screenshot_data)
        for requirement_data in requirements_data:
            Requirement.objects.create(game=game, **requirement_data)
        return game
