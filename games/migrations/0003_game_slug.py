# Generated by Django 2.2.5 on 2019-09-04 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_game_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='slug',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
