from django.db import transaction
from rest_framework import serializers

from .models import Slider


class SliderSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="slider-detail", lookup_field="_id"
    )

    class Meta:
        model = Slider
        fields = '__all__'
