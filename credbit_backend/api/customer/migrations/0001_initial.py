# Generated by Django 3.0.5 on 2021-03-15 13:54

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('first_name', models.CharField(default='Anonymous', max_length=20)),
                ('middle_name', models.CharField(blank=True, default='', max_length=20)),
                ('last_name', models.CharField(default='', max_length=20)),
                ('email', models.EmailField(max_length=70, unique=True, verbose_name='email')),
                ('phone', models.CharField(blank=True, default='', max_length=10)),
                ('security_code', models.CharField(blank=True, max_length=6)),
                ('street', models.CharField(blank=True, default='', max_length=150)),
                ('city', models.CharField(blank=True, default='', max_length=50)),
                ('state', models.CharField(blank=True, default='', max_length=50)),
                ('zip_code', models.CharField(blank=True, default='', max_length=6)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('session_token', models.CharField(default=0, max_length=10)),
                ('status', models.IntegerField(blank=True, default=0)),
                ('letter_sub_url', models.URLField(blank=True, default='', max_length=500)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
