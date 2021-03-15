from datetime import datetime, timedelta
from api.letter.models import LetterBureau
from api.letter.serializers import LetterBureauSerializer
import pytz

def send_emails():
  current_time = datetime.now().replace(tzinfo=pytz.UTC)
  letter_bureaus = LetterBureau.objects.filter(next_run_at__lt = current_time)
  print('In Email Service',letter_bureaus)
  for letter_bureau in letter_bureaus:
    print(f'Email sent to Bureau: {letter_bureau}')
    letter_bureau.save()