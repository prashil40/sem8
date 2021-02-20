# Generated by Django 3.0.5 on 2021-02-20 07:31

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('maptag', models.CharField(default='', max_length=50)),
                ('desc', models.CharField(blank=True, default='', max_length=500)),
                ('email', models.EmailField(max_length=254)),
                ('phone_no', models.CharField(blank=True, max_length=10, null=True)),
                ('opening_hours', models.CharField(max_length=50)),
                ('meta_title', models.CharField(max_length=30)),
                ('meta_desc', models.CharField(blank=True, default='', max_length=500)),
                ('meta_keywords', models.CharField(max_length=50)),
                ('office_name', models.CharField(max_length=50)),
            ],
        ),
    ]
