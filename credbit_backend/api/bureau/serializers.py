from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Bureau

class BureauSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="bureau-detail", lookup_field="_id"
    )
  email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=Bureau.objects.all(),
                message="Bureau with this email already exists",
            )
        ]
    )
  class Meta:
    model = Bureau
    fields = '__all__'