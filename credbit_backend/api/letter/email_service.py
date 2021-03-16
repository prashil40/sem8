from datetime import datetime, timedelta
from api.letter.models import LetterBureau, LetterClient
from api.customer.models import Client
from api.utils.field_utils import get_id_from_url
from api.utils.letter_utils import send_mail
from bson import ObjectId
import pytz


def send_emails():
    current_time = datetime.now().replace(tzinfo=pytz.UTC)
    letter_bureaus = LetterBureau.objects.filter(next_run_at__lt=current_time)
    print("In Email Service", letter_bureaus)
    for letter_bureau in letter_bureaus:
        client = Client.objects.get(
            letter_sub_url=LetterClient.objects.filter(
                _id=ObjectId(get_id_from_url(letter_bureau.letter_client_url))
            ).values("letter_sub_url")[0]["letter_sub_url"]
        )
        send_mail(letter_bureau, client)
        print(f"Email sent to Bureau: {letter_bureau}")
        letter_bureau.save()
