from djongo import models



class Payment(models.Model):
  _id = models.ObjectIdField()
  sub_url = models.URLField(max_length=500, blank=True, default='')
  payment_id = models.CharField(max_length=500, blank=True, default='')
  order_id = models.CharField(max_length=500, blank=True, default='')

  created_at = models.DateTimeField(auto_now_add=True)

