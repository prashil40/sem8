from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import SliderSerializer
from .models import Slider


class SliderViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Slider.objects.all()
    serializer_class = SliderSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                slider = Slider.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Slider.DoesNotExist:
                return JsonResponse(
                    {"error": "Slider does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            slider_serializer = SliderSerializer(
                slider, context={"request": request})

            return JsonResponse(slider_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                slider = Slider.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Slider.DoesNotExist:
                return JsonResponse(
                    {"error": "Slider does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            slider_serializer = SliderSerializer(
                slider, data=data, partial=True, context={"request": request}
            )

            if slider_serializer.is_valid():
                slider_serializer.save()
                return JsonResponse(slider_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                slider_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                slider = Slider.objects.get(_id=ObjectId(id))
                slider.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return JsonResponse(
                {"msg": "Record deleted"},
                status=status.HTTP_200_OK
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            return [permission() for permission in self.permission_classes]

# Create your views here.
