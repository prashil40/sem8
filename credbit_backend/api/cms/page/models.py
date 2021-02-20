from djongo import models


class Page(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=500, blank=True, default='')
    parent_id = models.CharField(max_length=50)
    image = models.ImageField(upload_to='page-images/')
    meta_title = models.CharField(max_length=50)
    meta_desc = models.CharField(max_length=500, blank=True, default='')
    meta_keywords = models.CharField(max_length=100)
    multi_images = models.ImageField(upload_to='page-images/')
    slug = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
# Create your models here.
