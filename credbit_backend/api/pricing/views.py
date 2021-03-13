from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from bson import ObjectId, errors

from .serializers import PricingSerializer
from .models import Pricing

from django.conf import settings

import razorpay


def setup_client():
    try:
        key = settings.ENV("RZP_KEY_ID")
        secret = settings.ENV("RZP_KEY_SECRET")
    except:
        raise KeyError("Cannot fetch razorpay key or secret")

    client = razorpay.Client(auth=(key, secret))
    return client


def get_period(period):
    if period == "m":
        return "monthly"
    elif period == "d":
        return "daily"
    elif period == "w":
        return "weekly"
    elif period == "y":
        return "yearly"
    else:
        raise KeyError("Invalid key passed")


class PricingViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {
        "create": [AllowAny],
        "update": [AllowAny],
        "retrieve": [AllowAny],
        "destroy": [AllowAny],
    }

    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer
    lookup_field = "_id"

    def list(self, request):
        try:
            client = setup_client()
        except KeyError:
            return JsonResponse(
                {"error": "Cannot fetch razorpay plans. Check your credentials"},
                status=status.HTTP_403_FORBIDDEN,
            )

        queryset = Pricing.objects.all()
        razorpay_plans = []
        for pricing in queryset:
            razorpay_plan = client.plan.fetch(pricing.rzp_plan_id)
            razorpay_plans.append(razorpay_plan)

        pricing_serializer = PricingSerializer(queryset, many=True, context={"request": request})
        return JsonResponse({"data": pricing_serializer.data, "razorpay": razorpay_plans}, status=status.HTTP_200_OK)

    def create(self, request):
        data = JSONParser().parse(request)
        try:
            client = setup_client()
        except KeyError:
            return JsonResponse(
                {"error": "Cannot make razorpay plans. Check your credentials"},
                status=status.HTTP_403_FORBIDDEN,
            )

        plan_data = {
            "period": get_period(data["duration"]),
            "interval": 1,
            "item": {
                "name": data["title"],
                "amount": int(data["amount"]) * 100,
                "currency": "INR",
                "description": data["desc"] if "desc" in data.keys() else "",
            },
            "notes": {
                "letters_count": data["letters_count"],
                "bureaus_count": data["bureaus_count"],
            },
        }
        res = client.plan.create(data=plan_data)
        data["rzp_plan_id"] = res["id"]

        pricing_serializer = PricingSerializer(data=data, context={"request": request})
        if pricing_serializer.is_valid():
            pricing_serializer.save()
            print(pricing_serializer.data)
            return JsonResponse(pricing_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                pricing_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, id=None):
        if id is not None:
            try:
                pricing = Pricing.objects.get(_id=ObjectId(id))
            except errors.InvalidId:
                return JsonResponse(
                    {"error": "Provide proper ID"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Pricing.DoesNotExist:
                return JsonResponse(
                    {"error": "Pricing does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            try:
                client = setup_client()
            except KeyError:
                return JsonResponse(
                    {"error": "Cannot fetch razorpay plans. Check your credentials"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            pricing_serializer = PricingSerializer(pricing, context={"request": request})
            razorpay_plan = client.plan.fetch(pricing.rzp_plan_id)

            return JsonResponse(
                {"data": pricing_serializer.data, "razorpay": razorpay_plan},
                status=status.HTTP_200_OK,
            )
        else:
            return JsonResponse(
                {"error": "Provide proper ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, id=None):
        return JsonResponse(
            {"error": "Cannot update razorpay Plan. Not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        # data = JSONParser().parse(request)
        # if id is not None:
        #     try:
        #         pricing = Pricing.objects.get(_id=ObjectId(id))
        #     except errors.InvalidId:
        #         return JsonResponse(
        #             {"error": "Provide proper ID"},
        #             status=status.HTTP_400_BAD_REQUEST,
        #         )
        #     except Pricing.DoesNotExist:
        #         return JsonResponse(
        #             {"error": "Pricing does not exist"},
        #             status=status.HTTP_404_NOT_FOUND,
        #         )

        #     pricing_serializer = PricingSerializer(
        #         pricing, data=data, partial=True, context={"request": request}
        #     )

        #     if pricing_serializer.is_valid():
        #         pricing_serializer.save()
        #         return JsonResponse(pricing_serializer.data, status=status.HTTP_200_OK)

        #     return JsonResponse(
        #         pricing_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        #     )
        # else:
        #     return JsonResponse(
        #         {"error": "Provide proper ID"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

    def destroy(self, request, id=None):
        return JsonResponse(
            {"error": "Cannot delete razorpay Plan. Not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        # if id is not None:
        #     try:
        #         pricing = Pricing.objects.get(_id=ObjectId(id))
        #         pricing.delete()
        #     except errors.InvalidId:
        #         return JsonResponse(
        #             {"error": "Provide proper ID"},
        #             status=status.HTTP_400_BAD_REQUEST,
        #         )
        #     except Pricing.DoesNotExist:
        #         return JsonResponse(
        #             {"error": "Pricing does not exist"},
        #             status=status.HTTP_404_NOT_FOUND,
        #         )

        #     return JsonResponse({"msg": "Record deleted"}, status=status.HTTP_200_OK)
        # else:
        #     return JsonResponse(
        #         {"error": "Provide proper ID"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            return [permission() for permission in self.permission_classes]