from djongo import models


class Contact(models.Model):
    _id = models.ObjectIdField()
    maptag = models.CharField(max_length=50, default='')
    desc = models.CharField(max_length=500, blank=True, default='')
    email = models.EmailField(blank=False)
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    opening_hours = models.CharField(max_length=50)
    meta_title = models.CharField(max_length=30)
    meta_desc = models.CharField(max_length=500, blank=True, default='')
    meta_keywords = models.CharField(max_length=50)
    office_name = models.CharField(max_length=50)


def __str__(self):
    self.office_name
# Create your models here.
