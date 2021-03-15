from djongo import models
import datetime
from croniter import croniter
from api.utils.field_utils import get_id_from_url, get_url_from_id
from bson import ObjectId
from api.customer.models import Client
# from api.subscription.models import Subscription
from api.pricing.models import Pricing

import pytz
from django.utils import timezone
class Letter(models.Model):
    _id = models.ObjectIdField()
    title = models.CharField(max_length=50, blank=False, unique=True)
    short_desc = models.CharField(max_length=500, blank=True, default="")
    content = models.TextField(blank=False)
    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class LetterSubscription(models.Model):
    _id = models.ObjectIdField()
    letters_count = models.IntegerField(blank=False, null=False, default=1)
    initial_letters_count = models.IntegerField(blank=False, null=False, default=1)
    bureaus_count = models.IntegerField(blank=True, default=1)
    status = models.BooleanField(blank=True, default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.letters_count)


class LetterClient(models.Model):
    _id = models.ObjectIdField()
    account_no = models.CharField(max_length=50, blank=False)
    creditor_name = models.CharField(max_length=100, blank=False)
    mention_date = models.DateField(blank=True, default=datetime.date.today)
    status = models.BooleanField(blank=True, default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stop_at = models.DateTimeField(blank=True, null=True)

    letter_sub_url = models.URLField(max_length=500, blank=True, default="")
    letter_url = models.URLField(max_length=500, blank=True, default="")

    def __str__(self):
        return self.pdf_file


def get_cron_expression(duration):
  if duration == 'm':
    day = (timezone.now() + datetime.timedelta(days=30)).day
    return f'0 0 {day} * *'
  elif duration == 'w':
    day = (timezone.now() + datetime.timedelta(days=7)).weekday()
    return f'0 0 * * {day}'
  else:
    day = (timezone.now() + datetime.timedelta(days=30)).day
    return f'0 0 {day} * *'

def get_default_date():
    return timezone.now()

class LetterBureau(models.Model):
    _id = models.ObjectIdField()
    letter_client_url = models.URLField(max_length=500, blank=True, default="")
    bureau_url = models.URLField(max_length=500, blank=True, default="")
    pdf_file = models.FileField(upload_to="letters/", blank=True, null=True)

    last_run_at = models.DateTimeField(null=True, blank=True, default=get_default_date)
    next_run_at = models.DateTimeField(null=True, blank=True, default=get_default_date)
    cron_expression = models.CharField(max_length=200, default='0 0 1 1 0')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.last_run_at = datetime.datetime.now().replace(tzinfo=pytz.UTC)

        # letter_client_id = get_id_from_url(self.letter_client_url)
        # letter_sub_url = LetterClient.objects.filter(
        #     _id=ObjectId(letter_client_id)
        # ).values("letter_sub_url")[0]["letter_sub_url"]
        # client_id = Client.objects.filter(letter_sub_url=letter_sub_url).values("_id")[
        #     0
        # ]["_id"]
        # client_url = f"http://127.0.0.1:8000/api/auth/client/{client_id}/"
        # pricing_id = get_id_from_url(
        #     Subscription.objects.filter(client_url=client_url).values("pricing_url")[0][
        #         "pricing_url"
        #     ]
        # )
        # duration = Pricing.objects.filter(_id=ObjectId(pricing_id)).values('duration')[0]['duration']
        self.cron_expression = get_cron_expression(args[0] if len(args) > 0 else 'm')
        print(self.cron_expression)

        iter = croniter(self.cron_expression, self.last_run_at)
        self.next_run_at = (iter.get_next(datetime.datetime)).replace(tzinfo=pytz.UTC)
        super(LetterBureau, self).save(*args, **kwargs)
