from django.db import transaction
from rest_framework import serializers

from .models import Logo


class LogoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="logo-detail", lookup_field="_id"
    )

    image = serializers.ImageField(
        max_length=None, allow_empty_file=False, allow_null=True, required=True)

    class Meta:
        model = Logo
        fields = '__all__'
