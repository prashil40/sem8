from django.db import transaction
from rest_framework import serializers

from .models import Page


class PageSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="page-detail", lookup_field="_id"
    )

    class Meta:
        model = Page
        fields = '__all__'
