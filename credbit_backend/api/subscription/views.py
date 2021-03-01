from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .models import Subscription
from .serializers import SubscriptionSerializer

from api.utils.field_utils import get_url_from_id

@api_view(["GET"])
@permission_classes((AllowAny,))
def get_specifc_subscriptions(request, type):
    is_url = True
    if 'url' in request.headers:
      url = request.headers['url']
    elif 'id' in request.headers:
        id = request.headers['id']
        is_url = False
    else:
      return JsonResponse(
            {"error": "Provide proper URL / ID in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        if type == "pricing":
            if not is_url:
                url = get_url_from_id(id, 'single_pricing', request)
            specific_subscriptions = Subscription.objects.filter(pricing_url=url)
        elif type == "client":
            if not is_url:
                url = get_url_from_id(id, 'single_client', request)
            specific_subscriptions = Subscription.objects.filter(client_url=url)
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

    subscriptions = SubscriptionSerializer(specific_subscriptions, context={"request": request}, many=True)
    # for subscription in specific_subscriptions:
    #     subscription_serializer = SubscriptionSerializer(
    #         subscription, context={"request": request}
    #     )
    #     subscriptions.append(subscription_serializer.data)

    return JsonResponse(subscriptions.data, safe=False, status=status.HTTP_200_OK)


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