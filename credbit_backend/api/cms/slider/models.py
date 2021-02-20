from djongo import models


class Slider(models.Model):
    _id = models.ObjectIdField()
    image_name = models.CharField(max_length=50)
    image_title = models.CharField(max_length=50)
    desc = models.CharField(max_length=500, blank=True, default='')
    meta_title = models.CharField(max_length=30)
    slug = models.CharField(max_length=100)
    link = models.CharField(max_length=100)
    image = models.ImageField(upload_to='slider-images/')


def __str__(self):
    self.office_name
# Create your models here.
