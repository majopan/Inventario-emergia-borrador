# Generated by Django 5.1.5 on 2025-02-20 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispositivos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posicion',
            name='color',
            field=models.CharField(default='gray', max_length=20),
        ),
    ]
