from django.urls import path, include
from rest_framework import routers
from .import views

router = routers.DefaultRouter()
router.register("page", views.PageViewSet)

urlpatterns = [
    path(
        "page/<str:id>/",
        views.PageViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name='single_page',
    ),
    path("", include(router.urls))
]
