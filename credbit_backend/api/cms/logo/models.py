from djongo import models


class Logo(models.Model):
    _id = models.ObjectIdField()
    image = models.ImageField(upload_to='logo-images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
