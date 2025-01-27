from django.db import models # type: ignore
from django.contrib.auth.models import User # type: ignore

from django.db import models

class Posicion(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Dispositivo(models.Model):
    TIPOS_DISPOSITIVOS = [
        ('CPU', 'Computador'),
        ('MONITOR', 'Monitor'),
        ('TABLET', 'Tablet'),
        ('MOVIL', 'Celular'),
    ]

    FABRICANTES = [
        ('DELL', 'Dell'),
        ('HP', 'HP'),
        ('LENOVO', 'Lenovo'),
        ('APPLE', 'Apple'),
        ('SAMSUNG', 'Samsung'),
    ]

    ESTADO_DISPOSITIVO = [
        ('REPARAR', 'En reparación'),
        ('BUENO', 'Buen estado'),
        ('PERDIDO', 'Perdido/robado'),
        ('COMPRADO', 'Comprado'),
        ('MALO', 'Mal estado'),
    ]

    REGIMENES = [
        ('CNC', 'CNC'),
        ('ECCC', 'ECCC'),
        ('ECOL', 'ECOL'),
    ]

    TIPOS_DISCO_DURO = [
        ('HDD', 'HDD (Disco Duro Mecánico)'),
        ('SSD', 'SSD (Disco de Estado Sólido)'),
        ('HYBRID', 'Híbrido (HDD + SSD)'),
    ]

    CAPACIDADES_DISCO_DURO = [
        ('120GB', '120 GB'),
        ('250GB', '250 GB'),
        ('500GB', '500 GB'),
        ('1TB', '1 TB'),
        ('2TB', '2 TB'),
        ('4TB', '4 TB'),
        ('8TB', '8 TB'),
    ]

    TIPOS_MEMORIA_RAM = [
        ('DDR', 'DDR'),
        ('DDR2', 'DDR2'),
        ('DDR3', 'DDR3'),
        ('DDR4', 'DDR4'),
        ('LPDDR4', 'LPDDR4'),
        ('LPDDR5', 'LPDDR5'),
    ]

    CAPACIDADES_MEMORIA_RAM = [
        ('2GB', '2 GB'),
        ('4GB', '4 GB'),
        ('8GB', '8 GB'),
        ('16GB', '16 GB'),
        ('32GB', '32 GB'),
        ('64GB', '64 GB'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPOS_DISPOSITIVOS)
    estado = models.CharField(max_length=10, choices=ESTADO_DISPOSITIVO, null=True, blank=True)
    marca = models.CharField(max_length=10, choices=FABRICANTES)
    razon_social = models.CharField(max_length=10, choices=REGIMENES, null=True, blank=True)
    modelo = models.CharField(max_length=50)
    serial = models.CharField(max_length=50, unique=True)
    placa_cu = models.CharField(max_length=50, unique=True, null=True, blank=True)
    posicion = models.ForeignKey(Posicion, on_delete=models.SET_NULL, null=True, blank=True)

    tipo_disco_duro = models.CharField(max_length=10, choices=TIPOS_DISCO_DURO, null=True, blank=True)
    capacidad_disco_duro = models.CharField(max_length=10, choices=CAPACIDADES_DISCO_DURO, null=True, blank=True)
    tipo_memoria_ram = models.CharField(max_length=10, choices=TIPOS_MEMORIA_RAM, null=True, blank=True)
    capacidad_memoria_ram = models.CharField(max_length=10, choices=CAPACIDADES_MEMORIA_RAM, null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.marca} {self.modelo} (Serial: {self.serial})"

    # Método para obtener detalles del dispositivo
    def obtener_detalles(self):
        detalles = {
            'Tipo': self.get_tipo_display(),
            'Estado': self.get_estado_display(),
            'Marca': self.get_marca_display(),
            'Razon Social': self.get_razon_social_display(),
            'Modelo': self.modelo,
            'Serial': self.serial,
            'Placa CU': self.placa_cu,
            'Posición': str(self.posicion) if self.posicion else 'No asignado',
            'Tipo Disco Duro': self.get_tipo_disco_duro_display() if self.tipo_disco_duro else 'No especificado',
            'Capacidad Disco Duro': self.get_capacidad_disco_duro_display() if self.capacidad_disco_duro else 'No especificado',
            'Tipo Memoria RAM': self.get_tipo_memoria_ram_display() if self.tipo_memoria_ram else 'No especificado',
            'Capacidad Memoria RAM': self.get_capacidad_memoria_ram_display() if self.capacidad_memoria_ram else 'No especificado',
        }
        return detalles


class Historial(models.Model):
    dispositivo = models.ForeignKey(Dispositivo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    cambios = models.TextField()

    def _str_(self):
        return f"Historial de {self.dispositivo.serial} - {self.fecha_modificacion}"