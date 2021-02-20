from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import FaviconSerializer
from .models import Favicon


class FaviconViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Favicon.objects.all()
    serializer_class = FaviconSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                favicon = Favicon.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Favicon.DoesNotExist:
                return JsonResponse(
                    {"error": "Favicon does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            favicon_serializer = FaviconSerializer(
                favicon, context={"request": request})

            return JsonResponse(favicon_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                favicon = Favicon.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Favicon.DoesNotExist:
                return JsonResponse(
                    {"error": "Favicon does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            favicon_serializer = FaviconSerializer(
                favicon, data=data, partial=True, context={"request": request}
            )

            if favicon_serializer.is_valid():
                favicon_serializer.save()
                return JsonResponse(favicon_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                favicon_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                favicon = Favicon.objects.get(_id=ObjectId(id))
                favicon.delete()
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
