from api.utils.field_utils import get_id_from_url, get_url_from_id
from api.utils.list_utils import get_letter_client_id
from api.utils.letter_utils import create_letter, validate_sub_count, reduce_sub_count
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

from django.utils.dateparse import parse_date
import datetime


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
        client_id = get_id_from_url(url)
    elif "id" in request.headers:
        client_id = request.headers["id"]
    else:
        return JsonResponse(
            {"error": "Provide proper URL / ID in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        client_sub_url = Client.objects.values_list("letter_sub_url", flat=True).get(
            _id=ObjectId(client_id)
        )
        letters_client = LetterClient.objects.filter(letter_sub_url=client_sub_url)
        letters = LetterClientSerializer(
            letters_client, context={"request": request}, many=True
        )
        # for letter_client in letters_client:
        #     letter_serializer = LetterClientSerializer(
        #         letter_client, context={"request": request}
        #     )
        #     letters.append(letter_serializer.data)

        return JsonResponse(letters.data, safe=False)
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
    elif "id" in request.headers:
        url = get_url_from_id(request.headers["id"], "single_bureau", request)
    else:
        return JsonResponse(
            {"error": "Provide proper URL / ID in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    letters_bureau = LetterBureau.objects.filter(bureau_url=url)
    try:
        letters_client_ids = []
        for letter_bureau in letters_bureau:
            letter_client_id = get_id_from_url(letter_bureau.letter_client_url)
            letters_client_ids.append(ObjectId(letter_client_id))
        letter_client = LetterClient.objects.filter(_id__in=letters_client_ids)
        print(letter_client)
        letters = LetterClientSerializer(
            letter_client, context={"request": request}, many=True
        )

        return JsonResponse(letters.data, safe=False)
    except LetterBureau.DoesNotExist:
        return JsonResponse(
            {"error": "Letter Bureau does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
@permission_classes((AllowAny,))
def post_letters(request):
    bad_req = status.HTTP_400_BAD_REQUEST
    not_found = status.HTTP_404_NOT_FOUND

    data = JSONParser().parse(request)

    info = {}

    client_url = data.pop("client_url", "")
    if client_url == "":
        client_id = data.pop("client_id", "")
        if client_id == "":
            return JsonResponse(
                {"error": "Please provide either client url or id"},
                status=bad_req,
            )
    else:
        client_id = get_id_from_url(client_url)

    try:
        client = Client.objects.get(_id=ObjectId(client_id))
    except Client.DoesNotExist:
        return JsonResponse({"error": "Client does not exist"}, status=not_found)
    except errors.InvalidId:
        return JsonResponse({"error": "Provide proper ID"}, status=bad_req)

    letter_sub_url = client.letter_sub_url
    letter_sub_id = get_id_from_url(letter_sub_url)
    if letter_sub_url == "":
        return JsonResponse(
            {"error": "Client does not have any subscription"},
            status=status.HTTP_403_FORBIDDEN,
        )

    mappings = data.pop("mappings", [])

    bureau_ids = []
    letter_ids = []
    creditor_names = []
    account_nos = []
    mention_dates = []

    if len(mappings) > 0:
        for mapping in mappings:
            account_no = mapping.pop("account_no", "")
            creditor_name = mapping.pop("creditor_name", "")
            mention_date = parse_date(mapping.pop("mention_date", ""))
            bureau_url = mapping.pop("bureau_url", "")
            letter_url = mapping.pop("letter_url", "")

            if not isinstance(mention_date, datetime.date):
                return JsonResponse(
                    {"error": "Please provide proper date string with format %Y-%m-%d"},
                    status=bad_req,
                )

            mention_dates.append(mention_date)
            account_nos.append(account_no)
            creditor_names.append(creditor_name)

            if bureau_url == "":
                bureau_id = mapping.pop("bureau_id", "")
                if bureau_id == "":
                    return JsonResponse(
                        {"error": "Please provide either bureau url or id"},
                        status=bad_req,
                    )
            else:
                bureau_id = get_id_from_url(bureau_url)

            if letter_url == "":
                letter_id = mapping.pop("letter_id", "")
                if letter_id == "":
                    return JsonResponse(
                        {"error": "Please provide either letter url or id"},
                        status=bad_req,
                    )
            else:
                letter_id = get_id_from_url(letter_url)

            try:
                Bureau.objects.get(_id=bureau_id)
                Letter.objects.get(_id=letter_id)
            except Bureau.DoesNotExist:
                JsonResponse(
                    {"error": f"Bureau with {bureau_id} does not exist"},
                    status=not_found,
                )
            except Letter.DoesNotExist:
                JsonResponse(
                    {"error": f"Letter with {letter_id} does not exist"},
                    status=not_found,
                )

            try:
                bureau_ids.append(ObjectId(bureau_id))
                letter_ids.append(ObjectId(letter_id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=bad_req,
                )

        unique_bureau_ids = list(set(bureau_ids))
        unique_letter_ids = list(set(letter_ids))

        letter_sub = LetterSubscription.objects.filter(_id=ObjectId(letter_sub_id))
        can_proceed, msg = validate_sub_count(
            letter_sub,
            len(unique_bureau_ids),
            len(unique_letter_ids),
        )

        if not can_proceed:
            return JsonResponse({"error": msg}, status=bad_req)

        letter_client_mappings = []
        for letter_id in unique_letter_ids:
            letter_url = get_url_from_id(letter_id, "single_letter", request)
            letter_client = LetterClient.objects.create(
                letter_sub_url=letter_sub_url,
                letter_url=letter_url,
                account_no=account_no,
                creditor_name=creditor_name,
                mention_date=mention_date,
            )
            print("Created letter client")
            letter_client_mappings.append({letter_id: letter_client._id})

        for bureau_id, letter_id, creditor_name, account_no, mention_date in zip(
            bureau_ids, letter_ids, creditor_names, account_nos, mention_dates
        ):
            letter_client_id = get_letter_client_id(letter_client_mappings, letter_id)
            letter_client_url = get_url_from_id(
                letter_client_id, "single_letter_client", request
            )

            letter_bureau = LetterBureau(
                letter_client_url=letter_client_url, bureau_url=bureau_url
            )
            letter_bureau.pdf_file = create_letter(
                letter_id,
                bureau_id,
                client,
                Letter,
                Bureau,
                account_no=account_no,
                creditor_name=creditor_name,
                mention_date=mention_date,
            )
            letter_bureau.save()

        reduce_sub_count(
            letter_sub,
            len(unique_bureau_ids),
            len(unique_letter_ids),
        )
    else:
        JsonResponse(
            {"error": "Please provide atleast one letter and bureau"}, status=bad_req
        )
    return JsonResponse({"success": True, "msg": "Letters created successfully"})
