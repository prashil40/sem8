from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import PageSerializer
from .models import Page


class PageViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                page = Page.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Page.DoesNotExist:
                return JsonResponse(
                    {"error": "Page does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            page_serializer = PageSerializer(
                page, context={"request": request})

            return JsonResponse(page_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                page = Page.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Page.DoesNotExist:
                return JsonResponse(
                    {"error": "Page does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            page_serializer = PageSerializer(
                page, data=data, partial=True, context={"request": request}
            )

            if page_serializer.is_valid():
                page_serializer.save()
                return JsonResponse(page_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                page_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                page = Page.objects.get(_id=ObjectId(id))
                page.delete()
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
