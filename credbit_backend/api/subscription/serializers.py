from api.customer.models import Client
from api.pricing.models import Pricing
from bson import ObjectId, errors
from django.db import transaction
from rest_framework import serializers, validators

from django.utils.translation import ugettext_lazy as _

from api.bureau.models import Bureau

from .models import Subscription
from api.utils.field_utils import get_id_from_url


class SubscriptionSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="sub-detail", lookup_field="_id"
    )

  def validate_client_url(self, client_url):
    client_id = get_id_from_url(client_url)
    try:
      Client.objects.get(_id=ObjectId(client_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except Client.DoesNotExist:
      raise serializers.ValidationError('Client does not exist')

    return client_url

  def validate_pricing_url(self, pricing_url):
    pricing_id = get_id_from_url(pricing_url)
    try:
      Pricing.objects.get(_id=ObjectId(pricing_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except Pricing.DoesNotExist:
      raise serializers.ValidationError('Pricing does not exist')

    return pricing_url

  class Meta:
    model = Subscription
    fields = '__all__'
    validators = [
      serializers.UniqueTogetherValidator(
        queryset=Subscription.objects.all(),
        fields=('client_url', 'pricing_url'),
        message=_("Client already has one subscription")
      )
    ]

  