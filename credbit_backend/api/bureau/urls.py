from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("bureau", views.BureauViewSet)

urlpatterns = [
    path(
        "bureau/<str:id>/",
        views.BureauViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_bureau",
    ),
    path("", include(router.urls)),
]