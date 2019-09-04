from django.core.management.base import BaseCommand, CommandError
from games.models import Genre, Platform, Game
from games.serializers import GameDeserializer
from django.contrib.auth.models import User
import requests





class Command(BaseCommand):
    help = 'BLAH'

    def handle(self, *args, **options):
        admin_user = User.objects.get(username='admin')
        response = requests.get('https://api.rawg.io/api/games?page_size=200&search=')
        json_response = response.json()

        game = json_response['results'][0]

        game_genre_ids = []
        for raw_genre in game['genres']:
            genre_id = Genre.objects.get(name=raw_genre['name']).id
            game_genre_ids.append(genre_id)

        game['genres'] = game_genre_ids

        game_platform_ids = []
        for raw_platform in game['platforms']:
            platform_id = Platform.objects.get(name=raw_platform['platform']['name']).id
            game_platform_ids.append(platform_id)

        game['platforms'] = game_platform_ids
        game['user'] = admin_user.pk

        if Game.objects.filter(name=game['name'], released=game['released']).exists():
            print('Game exists, skipping')
            return
        game_serializer = GameDeserializer(data=game)
        game_serializer.is_valid(raise_exception=True)
        game = game_serializer.save()
