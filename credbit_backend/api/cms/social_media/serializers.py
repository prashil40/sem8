from django.db import transaction
from rest_framework import serializers

from .models import SocialMedia


class SocialMediaSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="social_media-detail", lookup_field="_id"
    )

    class Meta:
        model = SocialMedia
        fields = '__all__'
