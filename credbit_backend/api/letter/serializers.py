from bson import ObjectId, errors
from django.db import transaction
from rest_framework import serializers, validators

from django.utils.translation import ugettext_lazy as _

from api.bureau.models import Bureau

from .models import Letter, LetterBureau, LetterClient, LetterSubscription
from api.utils.field_utils import get_id_from_url

class LetterSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter-detail", lookup_field="_id"
    )
  title = serializers.CharField(
        validators=[
            validators.UniqueValidator(
                queryset=Letter.objects.all(),
                message="Letter with the same title already exists",
            )
        ]
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
    letter_sub_id = get_id_from_url(letter_sub_url)
    try:
      LetterSubscription.objects.get(_id=ObjectId(letter_sub_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except LetterSubscription.DoesNotExist:
      raise serializers.ValidationError('Letter Subscription does not exist')

    return letter_sub_url

  def validate_letter_url(self, letter_url):
    letter_id = get_id_from_url(letter_url)
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
    validators = [
      serializers.UniqueTogetherValidator(
        queryset=LetterClient.objects.all(),
        fields=('letter_sub_url', 'letter_url'),
        message=_("This bureau letter already exists")
      )
    ]


class LetterBureauSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(
        view_name="letter_bureau-detail", lookup_field="_id"
    )

  def validate_letter_client_url(self, letter_client_url):
    letter_client_id = get_id_from_url(letter_client_url)
    try:
      LetterClient.objects.get(_id=ObjectId(letter_client_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except LetterClient.DoesNotExist:
      raise serializers.ValidationError('Letter Client does not exist')

    return letter_client_url

  def validate_bureau_url(self, bureau_url):
    bureau_id = get_id_from_url(bureau_url)
    try:
      Bureau.objects.get(_id=ObjectId(bureau_id))
    except errors.InvalidId:
      raise serializers.ValidationError('Provide proper ID')
    except Bureau.DoesNotExist:
      raise serializers.ValidationError('Bureau does not exist')

    return bureau_url

  class Meta:
    model = LetterBureau
    fields = '__all__'
    validators = [
      serializers.UniqueTogetherValidator(
        queryset=LetterBureau.objects.all(),
        fields=('letter_client_url', 'bureau_url'),
        message=_("This bureau letter already exists")
      )
    ]