from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("letter", views.LetterViewSet)

urlpatterns = [
    path(
        "letter/<str:id>/",
        views.LetterViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_letter",
    ),
    path("", include(router.urls)),
]
