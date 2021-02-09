from django.db import transaction
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Client
import re


# From https://github.com/encode/django-rest-framework/issues/1249

# from django.contrib.auth.models import Permission
# class PermissionSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Permission


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=Client.objects.all(),
                message="Client with this email already exists",
            )
        ]
    )
    url = serializers.HyperlinkedIdentityField(
        view_name="client-detail", lookup_field="_id"
    )

    @transaction.atomic()
    def create(self, validated_data):
        password = validated_data.pop("password", None)

        if password and not re.match(
            r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", password
        ):
            raise serializers.ValidationError(
                {
                    "error": """Password should match these criteria 
                - at least 8 characters
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                - Can contain special characters"""
                }
            )

        instance = Client.objects.create(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    @transaction.atomic()
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Client
        exclude = ("user_permissions", "groups")
        # Since there are no default viewsets for Permissions, Django will try to look up for them
        # and will throw error "ImproperlyConfigured"
        # solution is either add your own Permission viewset as mentioned above
        # or exclude this field
        lookup_field = "_id"
