# Generated by Django 4.1.7 on 2023-04-19 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0014_image'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Image',
            new_name='ProductImage',
        ),
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
    ]
