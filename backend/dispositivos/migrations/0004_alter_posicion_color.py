# Generated by Django 5.1.5 on 2025-02-21 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispositivos', '0003_alter_posicion_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posicion',
            name='color',
            field=models.CharField(default='#B0BEC5', max_length=20),
        ),
    ]
