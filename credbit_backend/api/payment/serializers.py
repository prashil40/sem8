from rest_framework import serializers
from api.utils.field_utils import get_id_from_url
from bson import ObjectId, errors

from api.subscription.models import Subscription

from .models import Payment

class PaymentSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="pay-detail", lookup_field="_id"
    )

  def validate_sub_url(self, sub_url):
    sub_id = get_id_from_url(sub_url)
    try:
      Subscription.objects.get(_id=ObjectId(sub_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except Subscription.DoesNotExist:
      raise serializers.ValidationError('Subscription does not exist')

    return sub_url

  class Meta:
    model = Payment
    fields = '__all__'
    
  