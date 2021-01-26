from django.db import transaction
from rest_framework import serializers

from .models import Client
import re


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    @transaction.atomic()
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        
        if password and not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', password):
          raise serializers.ValidationError(
            {
                'error': '''Password should match these criteria 
                - at least 8 characters
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                - Can contain special characters'''
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
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Client
        fields = '__all__'
        # lookup_field = '_id'
        # fields = (
        #   'id', 'first_name', 'middle_name', 'last_name', 
        #   'email', 'password', 'phone', 
        #   'is_active', 'is_superuser', 'is_staff',
        #   'street', 'city', 'state', 'zip_code', 
        #   'session_token', 
        #   'created_at', 'updated_at', 
        #   'registered_at', 'last_login_at', 
        #   'status')
