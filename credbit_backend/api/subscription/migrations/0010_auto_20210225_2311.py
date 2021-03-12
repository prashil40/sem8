# Generated by Django 3.0.5 on 2021-02-25 17:41

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0009_auto_20210225_2310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='period_end',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 3, 27, 17, 41, 40, 235347, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='subscription',
            name='unsubscribe_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 3, 27, 17, 41, 40, 235347, tzinfo=utc)),
        ),
    ]