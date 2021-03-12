from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("sub", views.SubscriptionViewSet, basename="sub")

urlpatterns = [
    path(
        "sub/<str:id>/",
        views.SubscriptionViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_subscription",
    ),
    path(
        "sub/type/<str:type>/",
        views.get_specifc_subscriptions,
        name="specific_subscriptions",
    ),
    path("", include(router.urls)),
]