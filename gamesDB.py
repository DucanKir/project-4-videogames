import sqlite3
import requests

sqlite_file = 'db.sqlite3'
conn = sqlite3.connect(sqlite_file)
cursor = conn.cursor()
cursor.execute("SELECT id FROM games_game_genres")
results = cursor.fetchall()
print(results)

response = requests.get('https://api.rawg.io/api/games?page_size=200&search=')

json_response = response.json()

conn = sqlite3.connect('')

# print(json_response['results'][0]['name'])
