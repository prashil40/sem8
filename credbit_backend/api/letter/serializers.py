from bson import ObjectId, errors
from django.db import transaction
from rest_framework import serializers

from .models import Letter, LetterClient, LetterSubscription

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

class LetterClientSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter_client-detail", lookup_field="_id"
    )
  # pdf_file = serializers.FileField(required=False)

  def validate_letter_sub_url(self, letter_sub_url):
    letter_sub_id = letter_sub_url[-25:-1]
    try:
      LetterSubscription.objects.get(_id=ObjectId(letter_sub_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except LetterSubscription.DoesNotExist:
      raise serializers.ValidationError('Letter Subscription does not exist')

    return letter_sub_url

  def validate_letter_url(self, letter_url):
    letter_id = letter_url[-25:-1]
    try:
      Letter.objects.get(_id=ObjectId(letter_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except Letter.DoesNotExist:
      raise serializers.ValidationError('Letter Subscription does not exist')

    return letter_url
  
  class Meta:
    model = LetterClient
    # fields = '__all__'
    exclude = ('pdf_file', )