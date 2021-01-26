from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register('client', views.ClientViewSet)

urlpatterns = [
    path('client/login/', views.client_signin, name='client_signin'),
    path('client/logout/<str:id>/', views.client_signout, name='client_signout'),
    path(
        'client/<str:id>/',
        views.ClientViewSet.as_view({'put': 'update', 'get': 'retrieve'}),
        name='client_update',
    ),
    path('', include(router.urls)),
]