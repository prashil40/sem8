from djongo import models

DURATION_CHOICES = (
  ('y', 'Yearly'),
  ('q', 'Quarterly'),
  ('m', 'Monthly'),
  ('w', 'Weekly'),
  ('d', 'Daily'),
)

class Pricing(models.Model):
  _id = models.ObjectIdField()
  title = models.CharField(max_length=100, blank=False)
  amount = models.FloatField(blank=False)
  duration = models.CharField(max_length=10, default='m', choices=DURATION_CHOICES)
  letters_count = models.IntegerField(blank=False)
  bureaus_count = models.IntegerField(blank=True, default=1)
  desc = models.TextField(blank=True, default='')
  status = models.BooleanField(blank=True, default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title
