from api.utils.field_utils import get_id_from_url
from django.http.response import JsonResponse
from django.core import serializers
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes

from bson import ObjectId, errors

from .serializers import (
    LetterSerializer,
    LetterSubscriptionSerializer,
    LetterClientSerializer,
    LetterBureauSerializer,
)
from .models import Letter, LetterClient, LetterSubscription, LetterBureau

from api.customer.models import Client
from api.bureau.models import Bureau

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

    def create(self, request):
        data = JSONParser().parse(request)
        try:
            email = data.pop("email", "")
            client = Client.objects.get(email=email)
        except Client.DoesNotExist:
            return JsonResponse(
                {"error": "Client does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        letter_sub_serializer = LetterSubscriptionSerializer(
            data=data, context={"request": request}
        )
        if letter_sub_serializer.is_valid():
            letter_sub_serializer.save()
            letter_sub_url = letter_sub_serializer.data["url"]
            if client.letter_sub_url != "":
                return JsonResponse(
                    {"error": "Client already has a subscription."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            client.letter_sub_url = letter_sub_url
            client.save()
            return JsonResponse(letter_sub_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                letter_sub_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

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
                    {"error": "Letter Subscription does not exist"},
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
                    {"error": "Letter Subscription does not exist"},
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
                letter_sub_serializer = LetterSubscriptionSerializer(
                    letter_sub, context={"request": request}
                )
                letter_sub_url = letter_sub_serializer.data["url"]

                client = Client.objects.get(letter_sub_url=letter_sub_url)
                client.letter_sub_url = ""
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


class LetterClientViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = LetterClient.objects.all()
    serializer_class = LetterClientSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                letter_client = LetterClient.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterClient.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Client does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_client_serializer = LetterClientSerializer(
                letter_client, context={"request": request}
            )

            return JsonResponse(
                letter_client_serializer.data, status=status.HTTP_200_OK
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                letter_client = LetterClient.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterClient.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Client does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_client_serializer = LetterClientSerializer(
                letter_client, data=data, partial=True, context={"request": request}
            )

            if letter_client_serializer.is_valid():
                letter_client_serializer.save()
                return JsonResponse(
                    letter_client_serializer.data, status=status.HTTP_200_OK
                )

            return JsonResponse(
                letter_client_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                letter_client = LetterClient.objects.get(_id=ObjectId(id))

                letter_client.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterClient.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Client does not exist"},
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


class LetterBureauViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = LetterBureau.objects.all()
    serializer_class = LetterBureauSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                letter_bureau = LetterBureau.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterBureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Bureau does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_bureau_serializer = LetterBureauSerializer(
                letter_bureau, context={"request": request}
            )

            return JsonResponse(
                letter_bureau_serializer.data, status=status.HTTP_200_OK
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                letter_bureau = LetterBureau.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterBureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Bureau does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            letter_bureau_serializer = LetterBureauSerializer(
                letter_bureau, data=data, partial=True, context={"request": request}
            )

            if letter_bureau_serializer.is_valid():
                letter_bureau_serializer.save()
                return JsonResponse(
                    letter_bureau_serializer.data, status=status.HTTP_200_OK
                )

            return JsonResponse(
                letter_bureau_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                letter_bureau = LetterBureau.objects.get(_id=ObjectId(id))

                letter_bureau.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except LetterBureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Letter Client does not exist"},
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


@api_view(["GET"])
@permission_classes((AllowAny,))
def get_client_letters(request):
    if "url" in request.headers:
        url = request.headers["url"]
    else:
        return JsonResponse(
            {"error": "Provide proper URL in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        client_id = get_id_from_url(url)
        client_sub_url = Client.objects.values_list('letter_sub_url', flat=True).get(_id=ObjectId(client_id))
        letters_client = LetterClient.objects.filter(letter_sub_url=client_sub_url)
        letters = []
        for letter_client in letters_client:
            letter_serializer = LetterClientSerializer(letter_client, context={'request': request})
            letters.append(letter_serializer.data)
        
        return JsonResponse(letters, safe=False)
    except Client.DoesNotExist:
        return JsonResponse(
            {"error": "Client does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )



@api_view(["GET"])
@permission_classes((AllowAny,))
def get_bureau_letters(request):
    if "url" in request.headers:
        url = request.headers["url"]
    else:
        return JsonResponse(
            {"error": "Provide proper URL in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        letters_bureau = LetterBureau.objects.filter(bureau_url=url)

        letters = []
        for letter_bureau in letters_bureau:
            letter_client_id = get_id_from_url(letter_bureau.letter_client_url)
            letter_client = LetterClient.objects.get(_id=ObjectId(letter_client_id))
            letter_serializer = LetterClientSerializer(letter_client, context={'request': request})
            letters.append(letter_serializer.data)
        
        return JsonResponse(letters, safe=False)
    except LetterBureau.DoesNotExist:
        return JsonResponse(
            {"error": "Letter Bureau does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
