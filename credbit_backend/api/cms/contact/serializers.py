from django.db import transaction
from rest_framework import serializers

from .models import Contact


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="contact-detail", lookup_field="_id"
    )

    class Meta:
        model = Contact
        fields = '__all__'
