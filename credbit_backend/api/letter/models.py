from djongo import models
import datetime
# from api.customer.models import Client

class Letter(models.Model):
  _id = models.ObjectIdField()
  title = models.CharField(max_length=50, blank=False, unique=True)
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

  def __str__(self):
    return self.letters_count


class LetterClient(models.Model):
  _id = models.ObjectIdField()
  account_no = models.CharField(max_length=50, blank=False)
  creditor_name = models.CharField(max_length=100, blank=False)
  mention_date = models.DateField(blank=True, default=datetime.date.today)
  pdf_file = models.FileField(upload_to='letters_client/', blank=True, null=True)
  status = models.BooleanField(blank=True, default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  stop_at = models.DateTimeField(blank=True, null=True)

  letter_sub_url = models.URLField(max_length=500, blank=True, default='')
  letter_url = models.URLField(max_length=500, blank=True, default='')

  def __str__(self):
    return self.pdf_file


class LetterBureau(models.Model):
  _id = models.ObjectIdField()
  letter_client_url = models.URLField(max_length=500, blank=True, default='')
  bureau_url = models.URLField(max_length=500, blank=True, default='')

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)