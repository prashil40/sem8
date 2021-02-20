from djongo import models
# from api.customer.models import Client

class Letter(models.Model):
  _id = models.ObjectIdField()
  title = models.CharField(max_length=50, blank=False)
  short_desc = models.CharField(max_length=500, blank=True, default='')
  content = models.TextField(blank=False)
  status = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
      return self.title


class LetterSubscription(models.Model):
  _id = models.ObjectIdField()
  letters_count = models.IntegerField(blank=False)
  bureaus_count = models.IntegerField(blank=True, default=1)
  status = models.BooleanField(blank=True, default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)