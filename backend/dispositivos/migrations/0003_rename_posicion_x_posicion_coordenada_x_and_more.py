# Generated by Django 5.1.5 on 2025-02-18 19:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispositivos', '0002_remove_servicios_sede_servicios_sedes_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posicion',
            old_name='posicion_x',
            new_name='coordenada_x',
        ),
        migrations.RenameField(
            model_name='posicion',
            old_name='posicion_y',
            new_name='coordenada_y',
        ),
        migrations.RemoveField(
            model_name='posicion',
            name='descripcion',
        ),
        migrations.RemoveField(
            model_name='posicion',
            name='id_espacio',
        ),
        migrations.RemoveField(
            model_name='posicion',
            name='status',
        ),
        migrations.AddField(
            model_name='posicion',
            name='estado',
            field=models.CharField(choices=[('disponible', 'Disponible'), ('ocupado', 'Ocupado'), ('reservado', 'Reservado'), ('inactivo', 'Inactivo')], default='disponible', max_length=10),
        ),
        migrations.AddField(
            model_name='posicion',
            name='sede',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posiciones', to='dispositivos.sede'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='posicion',
            name='servicio',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posiciones', to='dispositivos.servicios'),
        ),
        migrations.AlterField(
            model_name='posicion',
            name='color',
            field=models.CharField(default='green', max_length=10),
        ),
    ]
