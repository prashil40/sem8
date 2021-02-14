from django.db import transaction
from rest_framework import serializers

from .models import Letter

class LetterSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter-detail", lookup_field="_id"
    )
  class Meta:
    model = Letter
    fields = '__all__'