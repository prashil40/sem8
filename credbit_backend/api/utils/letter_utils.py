from weasyprint import HTML
from django.core.files.base import ContentFile
import datetime
from bson import ObjectId, errors
import stringcase

html_prev = """
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <style>
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

 
      .b-info{
        margin-bottom: 40px;
        line-height: 2;
      }

      .c-info{
        display:flex;
        flex-direction:column;
        margin-bottom: 50px;
      }

      .c-info div {
        margin-bottom: 5px;
      }
      .letter-content p {
        margin-bottom: 20px;
      }

      .letter-content {
        margin-bottom: 20px;
      }
    </style>
  </head>

  <body>
    <div class="b-info">
      {{bureau_desc}}
    </div>
    <div class="c-info">
      <div class="c-name">{{client_name}}</div>
      <div class="c-addr-1">{{client_street}}</div>
      <div class="c-addr-2">{{client_city}}, {{client_state}}, {{client_zipcode}}</div>
      <div class="c-acc-no"><strong>Account Number:</strong>&nbsp;{{account_no}}</div>
      <div class="c-cred-name"><strong>Creditor Name:</strong>&nbsp;{{creditor_name}}</div>
    </div>
    <div class="letter-content">
"""
html_next = """
    </div>
    <div class="salutation">
      Sincerely,<br>
      {{client_name}}
    </div>
  </body>
</html>
    """


def create_pdf(html):
    import logging

    logger = logging.getLogger("weasyprint")
    logger.addHandler(logging.FileHandler("weasyprint.log"))

    pdf = HTML(string=html.encode("utf-8"))

    return pdf.write_pdf()


def create_letter(letter_id, bureau_id, client, Letter, Bureau, **kwargs):
    letter = Letter.objects.filter(_id=ObjectId(letter_id)).values("title", "content")[
        0
    ]
    bureau = Bureau.objects.filter(_id=ObjectId(bureau_id)).values("title", "desc")[0]

    letter_title = stringcase.spinalcase(letter["title"].replace(" ", ""))
    bureau_title = stringcase.spinalcase(bureau["title"].replace(" ", ""))

    content = letter["content"]
    content = html_prev + content + html_next

    content = content.replace("{{bureau_desc}}", bureau["desc"])

    content = content.replace("{{client_name}}", client.full_name)
    content = content.replace("{{client_street}}", client.street)
    content = content.replace("{{client_city}}", client.city)
    content = content.replace("{{client_state}}", client.state)
    content = content.replace("{{client_zipcode}}", client.zip_code)

    content = content.replace("{{account_no}}", kwargs["account_no"])
    content = content.replace("{{creditor_name}}", kwargs["creditor_name"])
    content = content.replace("{{mention_date}}", str(kwargs["mention_date"]))

    content = content.replace("<", " <")
    content = content.replace(">", "> ")

    name = f'{letter_title}_{bureau_title}_{client.first_name}_{datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.pdf'
    return ContentFile(create_pdf(content), name=name)


def validate_sub_count(letter_sub, bureaus_count, letters_count):
    letter_sub = letter_sub.values("letters_count", "bureaus_count")[0]
    sub_letters_count = letter_sub["letters_count"]
    sub_bureaus_count = letter_sub["bureaus_count"]

    if (sub_letters_count - letters_count) < 0:
        return (False, "Client does not have enough letter count")
    elif (sub_bureaus_count - bureaus_count) < 0:
        return (False, "Client does not have enough bureau count")
    else:
        return (True, "Can proceed further")


def reduce_sub_count(letter_sub, bureaus_count, letters_count):
    letter_sub.update(
        letters_count=letter_sub[0].letters_count - letters_count,
        bureaus_count=letter_sub[0].bureaus_count - bureaus_count,
    )

    return
