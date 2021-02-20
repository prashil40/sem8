from django.urls import path, include
from . import views


urlpatterns = [
    path("logo/", include("api.cms.logo.urls")),
    path('page/', include('api.letter.urls')),
]
