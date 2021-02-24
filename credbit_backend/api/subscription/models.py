from djongo import models
from datetime import datetime, timedelta, timezone
from django.utils import timezone

class Subscription(models.Model):
  _id = models.ObjectIdField()
  sub_status = models.BooleanField(default=True)
  period_start = models.DateTimeField(auto_now_add=True)
  period_end = models.DateTimeField(blank=True, default=timezone.now() + timedelta(days=30))
  billing_address = models.TextField(default='')
  unsubscribe_date = models.DateTimeField(blank=True, default=timezone.now() + timedelta(days=30))

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  client_url = models.URLField(max_length=500, blank=False, default='')
  pricing_url = models.URLField(max_length=500, blank=False, default='')