from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("social_media", views.SocialMediaViewSet)

urlpatterns = [
    path(
        "social_media/<str:id>/",
        views.SocialMediaViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_social_media',
    ),
    path("", include(router.urls))
]
