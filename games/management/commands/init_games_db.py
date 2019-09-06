from django.core.management.base import BaseCommand, CommandError
from games.models import Genre, Platform, Game, Screenshot, Store
from games.serializers import GameDeserializer, ScreenshotSerializer, StoreSerializer
from django.contrib.auth.models import User
import requests





class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *_args, **_options):
        admin_user = User.objects.get(username='admin')

        count = 0
        api_url = 'https://api.rawg.io/api/games?page_size=200&search='
        while count < 10:
            response = requests.get(api_url)
            json_response = response.json()

            for game in json_response['results']:

                game_url = f"https://api.rawg.io/api/games/{game['slug']}"
                disc_response = requests.get(game_url)
                json_disc_response = disc_response.json()
                description = json_disc_response['description']

                print(json_disc_response['platforms'])
                return

                for raw_store in game['stores']:
                    if Store.objects.filter(url_en=raw_store['url_en']).exists():
                        print('Store exists, skipping')
                        continue
                    store_serializer = StoreSerializer(data={'store': raw_store['store']['name'], 'url_en': raw_store['url_en']})
                    store_serializer.is_valid(raise_exception=True)
                    raw_store = store_serializer.save()


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

                game_stores_ids = []
                for raw_store in game['stores']:
                    store_id = Store.objects.get(url_en=raw_store['url_en']).id
                    game_stores_ids.append(store_id)

                game['stores'] = game_stores_ids

                game['user'] = admin_user.pk
                game['descripton'] = description

                if not game['clip']:
                    continue

                if Game.objects.filter(name=game['name'], released=game['released']).exists():
                    print('Game exists, skipping')
                    continue
                game_serializer = GameDeserializer(data=game)
                game_serializer.is_valid(raise_exception=True)
                game = game_serializer.save()
            count += 1
            api_url = json_response['next']
