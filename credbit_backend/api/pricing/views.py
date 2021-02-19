from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import PricingSerializer
from .models import Pricing


class PricingViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                pricing = Pricing.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Pricing.DoesNotExist:
                return JsonResponse(
                    {"error": "Pricing does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_serializer = PricingSerializer(pricing, context={"request": request})

            return JsonResponse(letter_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                pricing = Pricing.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Pricing.DoesNotExist:
                return JsonResponse(
                    {"error": "Pricing does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_serializer = PricingSerializer(
                pricing, data=data, partial=True, context={"request": request}
            )

            if letter_serializer.is_valid():
                letter_serializer.save()
                return JsonResponse(letter_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                letter_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                pricing = Pricing.objects.get(_id=ObjectId(id))
                pricing.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Pricing.DoesNotExist:
                return JsonResponse(
                    {"error": "Pricing does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            return JsonResponse({"msg": "Record deleted"}, status=status.HTTP_200_OK)
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