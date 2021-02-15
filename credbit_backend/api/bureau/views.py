from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import BureauSerializer
from .models import Bureau


class BureauViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Bureau.objects.all()
    serializer_class = BureauSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                letter = Bureau.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Bureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Bureau does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            bureau_serializer = BureauSerializer(letter, context={"request": request})

            return JsonResponse(bureau_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                bureau = Bureau.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Bureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Bureau does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            bureau_serializer = BureauSerializer(
                bureau, data=data, partial=True, context={"request": request}
            )

            if bureau_serializer.is_valid():
                bureau_serializer.save()
                return JsonResponse(bureau_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                bureau_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                bureau = Bureau.objects.get(_id=ObjectId(id))
                bureau.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Bureau.DoesNotExist:
                return JsonResponse(
                    {"error": "Bureau does not exist"},
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