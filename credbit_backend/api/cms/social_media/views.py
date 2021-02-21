from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import SocialMediaSerializer
from .models import SocialMedia


class SocialMediaViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                social_media = SocialMedia.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except SocialMedia.DoesNotExist:
                return JsonResponse(
                    {"error": "SocialMedia does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            social_media_serializer = SocialMediaSerializer(
                social_media, context={"request": request})

            return JsonResponse(social_media_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                social_media = SocialMedia.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except SocialMedia.DoesNotExist:
                return JsonResponse(
                    {"error": "SocialMedia does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            social_media_serializer = SocialMediaSerializer(
                social_media, data=data, partial=True, context={"request": request}
            )

            if social_media_serializer.is_valid():
                social_media_serializer.save()
                return JsonResponse(social_media_serializer.data, status=status.HTTP_200_OK)

            return JsonResponse(
                social_media_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                social_media = SocialMedia.objects.get(_id=ObjectId(id))
                social_media.delete()
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
