from djongo import models


class Bureau(models.Model):
  _id = models.ObjectIdField()
  title = models.CharField(max_length=100, blank=False)
  email = models.EmailField(blank=False)
  desc = models.TextField(blank=True, default='')

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title
