from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("slider", views.SliderViewSet)

urlpatterns = [
    path(
        "slider/<str:id>/",
        views.SliderViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_slider',
    ),
    path("", include(router.urls))
]
