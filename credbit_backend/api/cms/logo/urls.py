from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("logo", views.LogoViewSet)

urlpatterns = [
    path(
        "logo/<str:id>/",
        views.LogoViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_logo',
    ),
    path("", include(router.urls))
]
