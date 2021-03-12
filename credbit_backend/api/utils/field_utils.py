from rest_framework.reverse import reverse
from django.urls.exceptions import NoReverseMatch

def get_id_from_url(url):
  return url[-25:-1]

def get_url_from_id(id, name, request):
  try:
    return reverse(name, args=[id], request=request)
  except NoReverseMatch as e:
    print(e)
    return e.__str__()
