# Generated by Django 4.1.7 on 2023-04-05 21:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_rename_is_vznsu_product_is_vendu'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='is_vendu',
            new_name='vendu',
        ),
    ]