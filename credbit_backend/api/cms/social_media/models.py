from djongo import models


class SocialMedia(models.Model):
    _id = models.ObjectIdField()
    image_name = models.CharField(max_length=50)
    icon_name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=50)
    link = models.CharField(max_length=100)

# Create your models here.
