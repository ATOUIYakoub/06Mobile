# Generated by Django 4.1.7 on 2023-04-24 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0027_commandeform'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='vendu',
        ),
        migrations.AddField(
            model_name='product',
            name='est_vendu',
            field=models.BooleanField(default=False),
        ),
    ]
