from weasyprint import HTML
from django.core.files.base import ContentFile
import datetime
from bson import ObjectId, errors
import stringcase

html_prev = """
<!DOCTYPE HTML>
<html>
    <head>
        <title>My Title</title>
        <style>
        </style>
    </head>
    <body>
"""
html_next = """
</body>
</html>
"""


def create_pdf(content):
    html = html_prev + content + html_next
    pdf = HTML(string=html.encode("utf-8"))

    return pdf.write_pdf()


def create_letter(letter_id, bureau_id, client, Letter, Bureau, **kwargs):
    letter = Letter.objects.filter(_id=ObjectId(letter_id)).values("title", "content")[0]
    bureau = Bureau.objects.filter(_id=ObjectId(bureau_id)).values("title")[0]

    letter_title = stringcase.spinalcase(letter['title'].replace(' ', ''))
    bureau_title = stringcase.spinalcase(bureau['title'].replace(' ', ''))

    content = letter['content']
    content = content.replace('{{account_no}}', kwargs['account_no'])
    content = content.replace('{{creditor_name}}', kwargs['creditor_name'])
    content = content.replace('{{mention_date}}', str(kwargs['mention_date']))
    
    name = f'{letter_title}_{bureau_title}_{client.first_name}_{datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.pdf'
    return ContentFile(create_pdf(content), name=name)
