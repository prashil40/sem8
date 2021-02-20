from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("letter", views.LetterViewSet)
router.register("letter_sub", views.LetterSubscriptionViewSet, basename='letter_sub')

urlpatterns = [
    path(
        "letter/<str:id>/",
        views.LetterViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_letter",
    ),
    path(
        "letter_sub/<str:id>/",
        views.LetterSubscriptionViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_letter_sub",
    ),
    path("", include(router.urls)),
]
