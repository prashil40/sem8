from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAdminUser

from bson import ObjectId, errors

from .serializers import LetterSerializer, LetterSubscriptionSerializer
from .models import Letter, LetterSubscription

from api.customer.models import Client
from api.customer.serializers import ClientSerializer

class LetterViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Letter.objects.all()
    serializer_class = LetterSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                letter = Letter.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Letter.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_sub_serializer = LetterSerializer(
                letter, context={"request": request}
            )

            return JsonResponse(letter_sub_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                letter = Letter.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Letter.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_sub_serializer = LetterSerializer(
                letter, data=data, partial=True, context={"request": request}
            )

            if letter_sub_serializer.is_valid():
                letter_sub_serializer.save()
                return JsonResponse(
                    letter_sub_serializer.data, status=status.HTTP_200_OK
                )

            return JsonResponse(
                letter_sub_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                letter = Letter.objects.get(_id=ObjectId(id))
                letter.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Letter.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter does not exist"},
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


class LetterSubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = LetterSubscription.objects.all()
    serializer_class = LetterSubscriptionSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                letter_sub = LetterSubscription.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterSubscription.DoesNotExist:
                return JsonResponse(
                    {"error": "LetterSubscription does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_sub_serializer = LetterSubscriptionSerializer(
                letter_sub, context={"request": request}
            )

            return JsonResponse(letter_sub_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                letter_sub = LetterSubscription.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterSubscription.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter  Subscription does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_sub_serializer = LetterSubscriptionSerializer(
                letter_sub, data=data, partial=True, context={"request": request}
            )

            if letter_sub_serializer.is_valid():
                letter_sub_serializer.save()
                return JsonResponse(
                    letter_sub_serializer.data, status=status.HTTP_200_OK
                )

            return JsonResponse(
                letter_sub_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                letter_sub = LetterSubscription.objects.get(_id=ObjectId(id))
                letter_sub_serializer = LetterSubscriptionSerializer(letter_sub, context={"request": request})
                letter_sub_url = letter_sub_serializer.data['url']

                client = Client.objects.get(letter_sub_url=letter_sub_url)
                client.letter_sub_url = ''
                client.save()

                letter_sub.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterSubscription.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Subscription does not exist"},
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