# from weasyprint import HTML
from django.core.files.base import ContentFile
import datetime
from bson import ObjectId
from PyPDF2 import PdfFileReader, PdfFileWriter
from PIL import Image
from urllib.request import urlopen
from django.urls import reverse
from io import BytesIO
from .field_utils import get_id_from_url
from api.bureau.models import Bureau
import stringcase
import yagmail
import secrets
import string
import os


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
    return
    # logger = logging.getLogger("weasyprint")
    # logger.addHandler(logging.FileHandler("weasyprint.log"))

    # pdf = HTML(string=html.encode("utf-8"))

    # return pdf.write_pdf()


def create_letter(letter_id, bureau_id, client, Letter, Bureau, **kwargs):
    letter = Letter.objects.filter(_id=ObjectId(letter_id)).values("title", "content")[
        0
    ]
    bureau = Bureau.objects.filter(_id=ObjectId(
        bureau_id)).values("title", "desc")[0]

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
    # elif (sub_bureaus_count - bureaus_count) < 0:
    #     return (False, "Client does not have enough bureau count")
    else:
        return (True, "Can proceed further")


def reduce_sub_count(letter_sub, bureaus_count, letters_count):
    letter_sub.update(
        letters_count=letter_sub[0].letters_count - letters_count,
        bureaus_count=letter_sub[0].bureaus_count - bureaus_count,
    )

    return


def send_mail(letter_bureau, client):
    if client.id_proof is None:
        print(FileNotFoundError('Cannot find id proof of client'))
        return

    url = "http://127.0.0.1:8000" + reverse(
        "grid_url:media_url", args={client.id_proof}
    )
    print(url)
    page = urlopen(url)
    content_type = page.headers.get("content-type")
    extension = content_type.split("/")[-1]

    f = page.read()
    f = BytesIO(f)
    file_name = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "id_"
        + "".join(
            secrets.choice(string.ascii_uppercase + string.digits) for _ in range(15)
        ),
    )

    if content_type == "application/pdf":
        reader = PdfFileReader(f)
        writer = PdfFileWriter()

        for pageNum in range(reader.getNumPages()):
            currentPage = reader.getPage(pageNum)
            writer.addPage(currentPage)

        file_name += f".{extension}"
        outputStream = open(file_name, "wb")
        writer.write(outputStream)
        outputStream.close()
    else:
        image = Image.open(f)
        file_name += f".{extension}"
        try:
            image.save(file_name)
        except OSError:
            new_image = image.convert("RGB")
            new_image.save(file_name)
    try:
        html = open(
            os.path.join(
                os.path.dirname(os.path.abspath(__file__)
                                ), "letter_email_template.html"
            ),
            "r",
            encoding="utf-8",
        )
    except:
        print(FileNotFoundError('Cannot find email template'))
        return

    bureau_email = Bureau.objects.filter(
        _id=ObjectId(get_id_from_url(letter_bureau.bureau_url))
    ).values("email")[0]["email"]

    letter_path = os.path.join(
        os.path.dirname(os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))),
        "media",
        str(letter_bureau.pdf_file),
    )
    yag = yagmail.SMTP("credbitservice@gmail.com")
    yag.send(
        bureau_email,
        f"Request to solve dispute of {client.full_name}",
        html.read(),
        [
            file_name,
            letter_path,
        ],
    )

    if os.path.exists(file_name):
        os.remove(file_name)
