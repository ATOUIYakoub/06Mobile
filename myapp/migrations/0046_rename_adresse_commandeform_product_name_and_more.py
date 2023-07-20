# Generated by Django 4.1.7 on 2023-07-19 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0045_remove_commandeform_status_commande_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commandeform',
            old_name='adresse',
            new_name='product_name',
        ),
        migrations.RemoveField(
            model_name='commande',
            name='status',
        ),
        migrations.AddField(
            model_name='commandeform',
            name='product_quantite',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
