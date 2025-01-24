from django.db import models # type: ignore
from django.contrib.auth.models import User # type: ignore

class Posicion(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    esta_ocupada = models.BooleanField(default=False)

    def _str_(self):
        return self.nombre

class Dispositivo(models.Model):
    TIPOS_DISPOSITIVOS = [
        ('CPU', 'Computador'),
        ('MONITOR', 'Monitor'),
        ('TABLET', 'Tablet'),
        ('MOVIL', 'Celular'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPOS_DISPOSITIVOS)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    serial = models.CharField(max_length=50, unique=True)
    posicion = models.ForeignKey(Posicion, on_delete=models.SET_NULL, null=True, blank=True)

    def _str_(self):
        return f"{self.tipo} - {self.marca} {self.modelo}"

class Historial(models.Model):
    dispositivo = models.ForeignKey(Dispositivo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    cambios = models.TextField()

    def _str_(self):
        return f"Historial de {self.dispositivo.serial} - {self.fecha_modificacion}"