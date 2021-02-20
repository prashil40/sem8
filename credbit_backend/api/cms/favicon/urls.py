from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("favicon", views.FaviconViewSet)

urlpatterns = [
    path(
        "favicon/<str:id>/",
        views.FaviconViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_favicon',
    ),
    path("", include(router.urls))
]
