from django.contrib import admin

# Register your models here.
from .models import Game, Genre, Platform, Screenshot, Clip, Store

admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Platform)
admin.site.register(Screenshot)
admin.site.register(Clip)
admin.site.register(Store)
