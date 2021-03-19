from api.subscription.models import Subscription
from django.conf import settings
from api.customer.models import Client
from api.pricing.models import Pricing
from bson import ObjectId

import razorpay


def setup_client():
    try:
        key = settings.ENV("RZP_KEY_ID")
        secret = settings.ENV("RZP_KEY_SECRET")
    except:
        raise KeyError("Cannot fetch razorpay key or secret")

    client = razorpay.Client(auth=(key, secret))
    return client


def get_period(period):
    if period == "m":
        return "monthly"
    elif period == "d":
        return "daily"
    elif period == "w":
        return "weekly"
    elif period == "y":
        return "yearly"
    else:
        raise KeyError("Invalid key passed")

def get_client_rzp_info(client_id):
  rzp_customer_id = Client.objects.filter(_id=ObjectId(client_id)).values('rzp_customer_id')[0]['rzp_customer_id']
  client = setup_client()
  return client.customer.fetch(customer_id=rzp_customer_id)

def get_pricing_rzp_info(pricing_id):
  rzp_plan_id = Pricing.objects.filter(_id=ObjectId(pricing_id)).values('rzp_plan_id')[0]['rzp_plan_id']
  client = setup_client()
  return client.plan.fetch(rzp_plan_id)

def get_sub_rzp_info(sub_id):
  rzp_sub_id = Subscription.objects.filter(_id=ObjectId(sub_id)).values('rzp_sub_id')[0]['rzp_sub_id']
  client = setup_client()
  return client.plan.fetch(rzp_sub_id)