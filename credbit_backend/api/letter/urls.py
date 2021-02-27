from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("letter", views.LetterViewSet)
router.register("letter_sub", views.LetterSubscriptionViewSet, basename='letter_sub')
router.register("letter_client", views.LetterClientViewSet, basename='letter_client')
router.register("letter_bureau", views.LetterBureauViewSet, basename='letter_bureau')

urlpatterns = [
    path("letter/client/", views.get_client_letters, name="client_letters"),
    path("letter/bureau/", views.get_bureau_letters, name="bureau_letters"),
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
    path(
        "letter_client/<str:id>/",
        views.LetterClientViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_letter_client",
    ),
    path(
        "letter_bureau/<str:id>/",
        views.LetterBureauViewSet.as_view(
            {"put": "update", "get": "retrieve", "delete": "destroy"}
        ),
        name="single_letter_bureau",
    ),
    path(
        "create/",
        views.post_letters,
        name="create_letters"
    ),
    path("", include(router.urls)),
]
