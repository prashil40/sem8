from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.customer.urls')),
    path('l/', include('api.letter.urls')),
    path('b/', include('api.bureau.urls')),
    path('p/', include('api.pricing.urls')),
    path('cms/', include('api.cms.urls')),
]
