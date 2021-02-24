from rest_framework.permissions import BasePermission
from api.utils.field_utils import get_id_from_url
from api.customer.models import Client

from bson import ObjectId, errors
class IsAuthenticated(BasePermission):
  message = 'User is not authenticated. Provide url/id and token in headers'

  def has_permission(self, request, view):
    try:
      if 'url' in request.headers.keys():
        id = get_id_from_url(request.headers['url'])
      else:
        id = request.headers['id']
      
      token = Client.objects.values_list('session_token', flat=True).get(_id=ObjectId(id))

      return token == request.headers['token']
    except:
      return False


class IsAdminUser(BasePermission):
  message = 'Forbidden. Only Admin can get access'

  def has_permission(self, request, view):
    try:
      token = Client.objects.values_list('session_token', flat=True).get(is_superuser=True)

      return token == request.headers['token']
    except:
      return False
