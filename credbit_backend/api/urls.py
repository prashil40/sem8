from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.customer.urls')),
    path('letters/', include('api.letter.urls')),
]
