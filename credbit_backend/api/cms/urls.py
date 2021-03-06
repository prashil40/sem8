from django.urls import path, include
from . import views


urlpatterns = [
    path("logo/", include("api.cms.logo.urls")),
    path('page/', include('api.cms.page.urls')),
    path('contact/', include('api.cms.contact.urls')),
    path('slider/', include('api.cms.slider.urls')),
    path('favicon/', include('api.cms.favicon.urls')),
    path('social_media/', include('api.cms.social_media.urls')),
]
