
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

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE)
    rating = models.CharField(max_length=50)
    slug = models.CharField(max_length=100)
    released = models.CharField(max_length=100)
    background_image = models.CharField(max_length=100)
    rating = models.CharField(max_length=100)
    ratings_count = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre, related_name='games', blank=True)
    platforms = models.ManyToManyField(Platform, related_name='games', blank=True)



    # class Meta:
    #     unique_together = ['name', 'released',]


    def __str__(self):
        return self.name
