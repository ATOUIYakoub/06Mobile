# Generated by Django 4.1.7 on 2023-04-20 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0023_commande_prix_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='quantite',
            field=models.IntegerField(default=0),
        ),
    ]