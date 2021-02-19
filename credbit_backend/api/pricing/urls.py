from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("pricing", views.PricingViewSet)

urlpatterns = [
    path(
        "pricing/<str:id>/",
        views.PricingViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_pricing",
    ),
    path("", include(router.urls)),
]