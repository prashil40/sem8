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


# class LetterSubscription():
#   _id = models.ObjectIdField()
#   client_id = models