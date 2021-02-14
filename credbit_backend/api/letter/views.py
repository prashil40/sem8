from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAdminUser

from bson import ObjectId, errors

from .serializers import LetterSerializer
from .models import Letter


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

            letter_serializer = LetterSerializer(letter, context={"request": request})

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

            letter_serializer = LetterSerializer(
                letter, data=data, partial=True, context={"request": request}
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