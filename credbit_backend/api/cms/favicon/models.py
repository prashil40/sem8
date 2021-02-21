from djongo import models


class Favicon(models.Model):
    _id = models.ObjectIdField()
    size = models.CharField(max_length=50)
    relation = models.CharField(max_length=50)
    image_name = models.CharField(max_length=50)


# Create your models here.
