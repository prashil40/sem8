from django.db import IntegrityError, migrations
from ..customer.models import Client  # Import Custom User Model
from django.db import transaction


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        client = Client(
            email="admin@admin.com",
            is_staff=True,
            is_superuser=True,
        )
        try:
            with transaction.atomic():
                client.set_password("admin1234")
                client.save()
        except IntegrityError:
            client.delete()

    dependencies = []

    operations = [
        migrations.RunPython(seed_data),
    ]
