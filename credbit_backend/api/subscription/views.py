from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .models import Subscription
from .serializers import SubscriptionSerializer


@api_view(["GET"])
@permission_classes((AllowAny,))
def get_specifc_subscriptions(request, type):
    if 'url' in request.headers:
      url = request.headers['url']
    else:
      return JsonResponse(
            {"error": "Provide proper URL in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        if type == "pricing":
            subscription = Subscription.objects.get(pricing_url=url)
        elif type == "client":
            subscription = Subscription.objects.get(client_url=url)
        else:
            return JsonResponse(
                {"error": "Provide proper type (pricing, client)"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except errors.InvalidId:
        return JsonResponse(
            {"error": "Provide proper ID"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Subscription.DoesNotExist:
        return JsonResponse(
            {"error": "Subscription does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    subscription_serializer = SubscriptionSerializer(
        subscription, context={"request": request}
    )

    return JsonResponse(subscription_serializer.data, status=status.HTTP_200_OK)


class SubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    lookup_field = "_id"

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                subscription = Subscription.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Subscription.DoesNotExist:
                return JsonResponse(
                    {"error": "Subscription does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            subscription_serializer = SubscriptionSerializer(
                subscription, context={"request": request}
            )

            return JsonResponse(subscription_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        data = JSONParser().parse(request)
        if id is not None:
            try:
                subscription = Subscription.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Subscription.DoesNotExist:
                return JsonResponse(
                    {"error": "Subscription does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            subscription_serializer = SubscriptionSerializer(
                subscription, data=data, partial=True, context={"request": request}
            )

            if subscription_serializer.is_valid():
                subscription_serializer.save()
                return JsonResponse(
                    subscription_serializer.data, status=status.HTTP_200_OK
                )

            return JsonResponse(
                subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, id=None):
        if id is not None:
            try:
                subscription = Subscription.objects.get(_id=ObjectId(id))
                subscription.delete()
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Subscription.DoesNotExist:
                return JsonResponse(
                    {"error": "Subscription does not exist"},
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