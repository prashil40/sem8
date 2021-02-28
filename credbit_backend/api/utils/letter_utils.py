from weasyprint import HTML
from django.core.files.base import ContentFile
import datetime
from bson import ObjectId, errors
import stringcase



def create_pdf(content):
    import logging
    logger = logging.getLogger('weasyprint')
    logger.addHandler(logging.FileHandler('weasyprint.log'))

    html_prev = """
    <!DOCTYPE HTML>
    <html>
        <head>
            <title>My Title</title>
            <style>
            div{
                width: 100%;
                height: 20px;
            }
            </style>
        </head>
        <body>
    """
    html_next = """
    </body>
    </html>
    """
    html = html_prev + content + html_next
    pdf = HTML(string=html.encode("utf-8"))

    return pdf.write_pdf()


def create_letter(letter_id, bureau_id, client, Letter, Bureau, **kwargs):
    letter = Letter.objects.filter(_id=ObjectId(letter_id)).values("title", "content")[
        0
    ]
    bureau = Bureau.objects.filter(_id=ObjectId(bureau_id)).values("title")[0]

    letter_title = stringcase.spinalcase(letter["title"].replace(" ", ""))
    bureau_title = stringcase.spinalcase(bureau["title"].replace(" ", ""))

    content = letter["content"]
    content = content.replace("{{account_no}}", kwargs["account_no"])
    content = content.replace("{{creditor_name}}", kwargs["creditor_name"])
    content = content.replace("{{mention_date}}", str(kwargs["mention_date"]))
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
