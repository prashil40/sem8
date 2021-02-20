from django.db import transaction
from rest_framework import serializers

from .models import Letter, LetterSubscription

class LetterSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter-detail", lookup_field="_id"
    )
  class Meta:
    model = Letter
    fields = '__all__'

class LetterSubscriptionSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter_sub-detail", lookup_field="_id"
    )

  class Meta:
    model = LetterSubscription
    fields = '__all__'