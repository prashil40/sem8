from bson import ObjectId, errors
from djongo import models
from datetime import datetime, timedelta, timezone
from django.utils import timezone

from django.db.models.signals import post_save
from django.dispatch import receiver

from api.customer.models import Client
from api.letter.models import LetterSubscription
from api.pricing.models import Pricing
from api.utils.field_utils import get_id_from_url

def get_default_date():
    timezone.now() + timedelta(days=30)

class Subscription(models.Model):
    _id = models.ObjectIdField()
    sub_status = models.BooleanField(default=True)
    period_start = models.DateTimeField(auto_now_add=True)
    period_end = models.DateTimeField(
        blank=True, default=get_default_date
    )
    billing_address = models.TextField(default="")
    unsubscribe_date = models.DateTimeField(
        blank=True, default=get_default_date
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    client_url = models.URLField(max_length=500, blank=False, default="")
    pricing_url = models.URLField(max_length=500, blank=False, default="")


@receiver([post_save], sender=Subscription)
def create_letter_sub(sender, instance=None, created=False, **kwargs):
    if created:
        client_id = get_id_from_url(instance.client_url)
        pricing_id = get_id_from_url(instance.pricing_url)
        try:
            pricing = Pricing.objects.filter(_id=ObjectId(pricing_id)).values(
                "letters_count", "bureaus_count"
            )[0]
            letters_count = pricing["letters_count"]
            bureaus_count = pricing["bureaus_count"]
            letter_sub = LetterSubscription.objects.create(
                letters_count=letters_count,
                initial_letters_count=letters_count,
                bureaus_count=bureaus_count,
            )
            letter_sub_id = str(letter_sub._id)
            letter_sub_url = f"http://127.0.0.1:8000/api/l/letter_sub/{letter_sub_id}/"

            Client.objects.filter(_id=ObjectId(client_id)).update(
                letter_sub_url=letter_sub_url
            )
        except errors.InvalidId:
            raise TypeError("Object ID is invalid")
