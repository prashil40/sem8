# Generated by Django 3.0.5 on 2021-02-20 10:42

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Favicon',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('size', models.CharField(max_length=50)),
                ('relation', models.CharField(max_length=50)),
                ('image_name', models.CharField(max_length=50)),
            ],
        ),
    ]
