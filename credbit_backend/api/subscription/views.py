from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .models import Subscription
from .serializers import SubscriptionSerializer

from api.pricing.models import Pricing

from api.utils.field_utils import get_url_from_id, get_id_from_url
from api.utils.rzp_utils import setup_client, get_client_rzp_info, get_pricing_rzp_info

from django.utils import timezone
from datetime import timedelta

@api_view(["GET"])
@permission_classes((AllowAny,))
def get_specifc_subscriptions(request, type):
    is_url = True
    if "url" in request.headers:
        url = request.headers["url"]
    elif "id" in request.headers:
        id = request.headers["id"]
        is_url = False
    else:
        return JsonResponse(
            {"error": "Provide proper URL / ID in header"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        if type == "pricing":
            if not is_url:
                url = get_url_from_id(id, "single_pricing", request)
            specific_subscriptions = Subscription.objects.filter(pricing_url=url)
        elif type == "client":
            if not is_url:
                url = get_url_from_id(id, "single_client", request)
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

    subscriptions = SubscriptionSerializer(
        specific_subscriptions, context={"request": request}, many=True
    )
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

    def create(self, request):
        data = JSONParser().parse(request)
        try:
            client = setup_client()
        except KeyError:
            return JsonResponse(
                {"error": "Cannot make razorpay subscription. Check your credentials"},
                status=status.HTTP_403_FORBIDDEN,
            )
        pricing_id = get_id_from_url(data["pricing_url"])
        client_id = get_id_from_url(data["client_url"])
        try:
            rzp_customer_id = get_client_rzp_info(client_id)["id"]
            rzp_pricing_id = get_pricing_rzp_info(pricing_id)["id"]
        except KeyError:
            return JsonResponse(
                {
                    "error": "Cannot fetch razorpay plan or customer. Check your credentials"
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # duration = Pricing.objects.filter(_id=ObjectId(pricing_id)).values('duration')[0]['duration']
        expiry_by = (timezone.now() + timedelta(days=30)).replace(tzinfo=timezone.utc).timestamp()
        sub_data = {
            "plan_id": rzp_pricing_id,
            "customer_id": rzp_customer_id,
            "total_count": 1,
            # "expiry_by": int(expiry_by),
        }

        res = client.subscription.create(data=sub_data)
        data["rzp_sub_id"] = res["id"]

        sub_serializer = SubscriptionSerializer(
            data=data, context={"request": request}
        )
        if sub_serializer.is_valid():
            sub_serializer.save()
            return JsonResponse(sub_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                sub_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

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

                try:
                    client = setup_client()
                except KeyError:
                    return JsonResponse(
                        {"error": "Cannot make razorpay subscription. Check your credentials"},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                client.subscription.cancel(subscription.rzp_sub_id)

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