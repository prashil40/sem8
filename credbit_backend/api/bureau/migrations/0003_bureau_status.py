# Generated by Django 3.0.5 on 2021-02-28 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bureau', '0002_auto_20210221_2225'),
    ]

    operations = [
        migrations.AddField(
            model_name='bureau',
            name='status',
            field=models.BooleanField(blank=True, default=True),
        ),
    ]