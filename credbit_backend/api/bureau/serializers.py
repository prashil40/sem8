from rest_framework import serializers

from .models import Bureau

class BureauSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="bureau-detail", lookup_field="_id"
    )

  class Meta:
    model = Bureau
    fields = '__all__'