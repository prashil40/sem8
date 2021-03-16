from djongo import models
from django.contrib.auth.models import AbstractUser
from gridfs_storage.storage import GridFSStorage


class Client(AbstractUser):
    _id = models.ObjectIdField()
    first_name = models.CharField(max_length=20, default="Anonymous")
    middle_name = models.CharField(max_length=20, blank=True, default="")
    last_name = models.CharField(max_length=20, default="")

    email = models.EmailField(
        verbose_name="email", max_length=70, unique=True, blank=False
    )
    phone = models.CharField(max_length=10, blank=True, default="")
    security_code = models.CharField(max_length=6, blank=True)

    street = models.CharField(max_length=150, blank=True, default="")
    city = models.CharField(max_length=50, blank=True, default="")
    state = models.CharField(max_length=50, blank=True, default="")
    zip_code = models.CharField(max_length=6, blank=True, default="")

    username = None
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    session_token = models.CharField(max_length=10, default=0)

    status = models.IntegerField(blank=True, default=0)

    id_proof = models.FileField(storage=GridFSStorage(collection='id_proof'), null=True, blank=True)

    letter_sub_url = models.URLField(max_length=500, blank=True, default='')


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    @property
    def full_name(self):
        return '%s %s %s' % (self.first_name, self.middle_name, self.last_name)

    def __str__(self):
        return self.email
