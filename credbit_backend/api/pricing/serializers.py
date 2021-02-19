from rest_framework import serializers

from .models import Pricing

class PricingSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="pricing-detail", lookup_field="_id"
    )

  class Meta:
    model = Pricing
    fields = '__all__'
    
  