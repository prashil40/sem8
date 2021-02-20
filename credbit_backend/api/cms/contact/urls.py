from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("contact", views.ContactViewSet)

urlpatterns = [
    path(
        "contact/<str:id>/",
        views.ContactViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_contact',
    ),
    path("", include(router.urls))
]
