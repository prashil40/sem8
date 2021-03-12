# Generated by Django 3.0.5 on 2021-02-24 16:41

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0005_auto_20210222_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='period_end',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 3, 26, 16, 41, 10, 175864, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='subscription',
            name='unsubscribe_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 3, 26, 16, 41, 10, 175864, tzinfo=utc)),
        ),
    ]