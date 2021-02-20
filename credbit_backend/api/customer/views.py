from django.contrib.auth.models import Permission
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import ClientSerializer
from .models import Client
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout

from bson import ObjectId, errors
import re
import random


def generate_session_tokens(length=10):
    token_chars_list = (
        [chr(i) for i in range(97, 123)]
        + [str(i) for i in range(10)]
        + [chr(i) for i in range(65, 91)]
    )
    return "".join(
        random.SystemRandom().choice(token_chars_list) for _ in range(length)
    )


@csrf_exempt
def client_signin(request):
    if not request.method == "POST":
        return JsonResponse(
            {"error": "Send a post request with valid parameters"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    username = request.POST["email"]
    password = request.POST["password"]

    # Validation Part
    if not re.match(r"\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b", username):
        return JsonResponse(
            {"error": "Enter a valid email"}, status=status.HTTP_400_BAD_REQUEST
        )

    # if not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', password):
    #     return JsonResponse(
    #         {
    #             'error': '''Password should match these criteria
    #             - at least 8 characters
    #             - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    #             - Can contain special characters'''
    #         }
    #     )

    UserModel = Client

    try:
        # Get the user object from current email
        user = UserModel.objects.get(email=username)

        # Check is password entered by user is matching with 'user' or not
        if user.check_password(password):
            user_dict = UserModel.objects.filter(email=username).values().first()

            user_dict.pop("password")

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse(
                    {"error": "Previous session exists. Try again"},
                    status=status.HTTP_409_CONFLICT,
                )

            token = generate_session_tokens()
            user.session_token = token
            user.save()
            user_dict["session_token"] = token
            user_dict["_id"] = str(user_dict["_id"])  # To convert ObjectId to String

            user = authenticate(username=username, password=password)
            login(request, user)

            return JsonResponse(
                {"token": token, "user": user_dict}, status=status.HTTP_200_OK
            )
        else:
            return JsonResponse(
                {"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED
            )

    except UserModel.DoesNotExist:
        return JsonResponse(
            {"error": "Client does not exist"}, status=status.HTTP_404_NOT_FOUND
        )


def client_signout(request, id):
    logout(request)
    UserModel = Client

    try:
        user = UserModel.objects.get(_id=ObjectId(id))
        if user.session_token == "0":
            return JsonResponse(
                {"error": "Already logged out"}, status=status.HTTP_409_CONFLICT
            )
        else:
            user.session_token = "0"
            user.save()
            return JsonResponse(
                {"success": "Logout success"}, status=status.HTTP_200_OK
            )

    except UserModel.DoesNotExist:
        return JsonResponse(
            {"error": "Client does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except errors.InvalidId:
        return JsonResponse(
            {"error": "Provide proper ID"}, status=status.HTTP_406_NOT_ACCEPTABLE
        )

@csrf_exempt
def get_client(request, email=None):
    if email is not None:
        try:
            client = Client.objects.get(email=email)
        except Client.DoesNotExist:
            return JsonResponse(
                {"error": "Client does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        client_serializer = ClientSerializer(client, context={"request": request})

        return JsonResponse(client_serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse(
            {"error": "Provide an Email ID"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ClientViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
    }

    queryset = Client.objects.all().exclude(is_superuser=True)
    serializer_class = ClientSerializer
    lookup_field = "_id"

    # def create(self, request):
    #     data = JSONParser().parse(request)
    #     print(data)
    #     client_serializer = ClientSerializer(data, context={"request": request})
    #     print(client_serializer)
    #     return JsonResponse(client_serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                client = Client.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Client.DoesNotExist:
                return JsonResponse(
                    {"error": "Client does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            # Since this is hyperlinked model serializer, we need to pass request
            client_serializer = ClientSerializer(client, context={"request": request})

            return JsonResponse(client_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id):
        data = JSONParser().parse(request)
        try:
            client = Client.objects.get(_id=ObjectId(id))
        except errors.InvalidId:
            return JsonResponse(
                {"error": "Provide proper ID"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Client.DoesNotExist:
            return JsonResponse(
                {"error": "Client does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        client_serializer = ClientSerializer(client, data=data, partial=True, context={"request": request})
        if client_serializer.is_valid():
            client_serializer.save()
            return JsonResponse(client_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(
            client_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            return [permission() for permission in self.permission_classes]


# From https://github.com/encode/django-rest-framework/issues/1249

# class PermissionViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows permissions to be viewed or edited.
#     """
#     queryset = Permission.objects.all()
#     serializer_class = PermissionSerializer