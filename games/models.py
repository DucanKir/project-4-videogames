
from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Store(models.Model):
    store = models.CharField(max_length=500)
    url_en = models.CharField(max_length=500)


    def __str__(self):
        return self.store


# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=500)
    user = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE)
    rating = models.CharField(max_length=50)
    slug = models.CharField(max_length=100)
    released = models.CharField(max_length=100)
    background_image = models.CharField(max_length=100)
    rating = models.CharField(max_length=100)
    ratings_count = models.CharField(max_length=100)
    playtime = models.CharField(max_length=100)
    # stores = models.CharField(max_length=100) #############]
    genres = models.ManyToManyField(Genre, related_name='games', blank=True)
    platforms = models.ManyToManyField(Platform, related_name='games', blank=True)
    stores = models.ManyToManyField(Store, related_name='games', blank=True)
    description = models.TextField(blank=True)



    class Meta:
        unique_together = ['name', 'released',]


    def __str__(self):
        return self.name

class Clip(models.Model):
    clip = models.CharField(max_length=500)
    game = models.ForeignKey(Game, related_name='clip', blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.clip

class Requirement(models.Model):
    minimum = models.CharField(max_length=5000)
    recomended = models.CharField(max_length=5000)
    game = models.ForeignKey(Game, related_name='requirements', blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.minimum




class Screenshot(models.Model):
    image = models.CharField(max_length=500)
    game = models.ForeignKey(Game, related_name='short_screenshots', blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.image
