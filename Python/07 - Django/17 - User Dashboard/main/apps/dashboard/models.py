from __future__ import unicode_literals

from django.db import models

from ..account.models import User

# Create your models here.
class WallManager(models.Manager):
    pass


class Wall(models.Model):
    pass


class Post(models.Model):
    objects = WallManager()
    pass
