from django.db import transaction
from rest_framework import serializers

from .models import Favicon


class FaviconSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="favicon-detail", lookup_field="_id"
    )

    class Meta:
        model = Favicon
        fields = '__all__'
