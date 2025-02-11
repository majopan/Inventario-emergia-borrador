import json
from django.core.management.base import BaseCommand
from dispositivos.models import Posicion  # Asegúrate de importar tu modelo correctamente

class Command(BaseCommand):
    help = 'Carga los datos del JSON en el modelo Posicion'

    def handle(self, *args, **kwargs):
        # Eliminar todos los registros existentes
        Posicion.objects.all().delete()

        json_data = '''
        {
            "sections": [
                {
                    "name": "Cafeteria",
                    "type": "area",
                    "position": {"x": 0, "y": 0},
                    "cells": []
                },
                {
                    "name": "Sala Capacitaciones",
                    "type": "room",
                    "position": {"x": 0, "y": 100},
                    "cells": [
                        {
                            "id": "E001",
                            "status": "available",
                            "color": "yellow",
                            "position": {"x": 70, "y": 220},
                            "floor": "Piso 1",
                            "name": "Espacio E001",
                            "description": "Sala de reuniones pequeña."
                        },
                        {
                            "id": "E002",
                            "status": "available",
                            "color": "yellow",
                            "position": {"x": 120, "y": 220},
                            "floor": "Torre 1",
                            "name": "Espacio E002",
                            "description": "Sala de reuniones pequeña."
                        }
                    ]
                },
                {
                    "name": "Bottom Cells",
                    "type": "area",
                    "position": {"x": 0, "y": 200},
                    "cells": [
                        {
                            "id": "E003",
                            "status": "available",
                            "color": "default",
                            "position": {"x": 20, "y": 340},
                            "floor": "Piso 1",
                            "name": "Espacio E003",
                            "description": "Área de trabajo individual."
                        },
                        {
                            "id": "E004",
                            "status": "available",
                            "color": "default",
                            "position": {"x": 70, "y": 340},
                            "floor": "Torre 1",
                            "name": "Espacio E004",
                            "description": "Área de trabajo individual."
                        },
                        {
                            "id": "E005",
                            "status": "available",
                            "color": "default",
                            "position": {"x": 120, "y": 340},
                            "floor": "Piso 1",
                            "name": "Espacio E005",
                            "description": "Área de trabajo individual."
                        },
                        {
                            "id": "E006",
                            "status": "reserved",
                            "color": "red-mark",
                            "position": {"x": 170, "y": 340},
                            "floor": "Torre 1",
                            "name": "Espacio E006",
                            "description": "Área de trabajo reservada."
                        },
                        {
                            "id": "E007",
                            "status": "available",
                            "color": "default",
                            "position": {"x": 20, "y": 500},
                            "floor": "Piso 1",
                            "name": "Espacio E007",
                            "description": "Área de trabajo individual."
                        },
                        {
                            "id": "E008",
                            "status": "reserved",
                            "color": "red-dot",
                            "position": {"x": 70, "y": 500},
                            "floor": "Torre 1",
                            "name": "Espacio E008",
                            "description": "Área de trabajo reservada."
                        },
                        {
                            "id": "E009",
                            "status": "available",
                            "color": "orange",
                            "position": {"x": 120, "y": 500},
                            "floor": "Piso 1",
                            "name": "Espacio E009",
                            "description": "Área de trabajo compartida."
                        },
                        {
                            "id": "E010",
                            "status": "available",
                            "color": "default",
                            "position": {"x": 170, "y": 500},
                            "floor": "Torre 1",
                            "name": "Espacio E010",
                            "description": "Área de trabajo individual."
                        }
                    ]
                }
            ]
        }
        '''

        data = json.loads(json_data)

        for section in data['sections']:
            for cell in section['cells']:
                Posicion.objects.create(
                    piso=cell['floor'],
                    nombre=cell['name'],
                    descripcion=cell['description'],
                    id_espacio=cell['id'],
                    status=cell['status'],
                    color=cell['color'],
                    posicion_x=cell['position']['x'],
                    posicion_y=cell['position']['y']
                )

        self.stdout.write(self.style.SUCCESS('Datos cargados exitosamente'))