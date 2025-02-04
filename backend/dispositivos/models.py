from django.db import models # type: ignore
from django.contrib.auth.models import AbstractUser # type: ignore
from django.db.models.signals import post_save # type: ignore
from django.dispatch import receiver # type: ignore
from django.conf import settings # type: ignore

class Sede(models.Model):
    """
    Modelo que representa una sede.
    """
    nombre = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    direccion = models.TextField()

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Sede"
        verbose_name_plural = "Sedes"

class RolUser(AbstractUser):
    """
    Modelo de usuario personalizado basado en AbstractUser.
    """
    ROLES_CHOICES = [
        ('admin', 'Administrador'),
        ('coordinador', 'Coordinador'),
    ]
    rol = models.CharField(max_length=15, choices=ROLES_CHOICES, default='coordinador')
    nombre = models.CharField("Nombre completo", max_length=150, blank=True, null=True)
    celular = models.CharField("Celular", max_length=15, blank=True, null=True)
    documento = models.CharField("Documento de identificación", max_length=50, blank=True, null=True)
    email = models.EmailField("Correo electrónico", unique=True)

    # Relación con sedes
    sedes = models.ManyToManyField(Sede, blank=True, related_name='usuarios_asignados')

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='Los grupos a los que pertenece este usuario.',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Permisos específicos para este usuario.',
        related_query_name='custom_user',
    )

    def __str__(self):
        return f"{self.nombre} ({self.username})" if self.nombre else self.username

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ['id']

class Servicios(models.Model):
    nombre = models.CharField(max_length=100)
    codigo_analitico = models.TextField(null=True, blank=True)
    sede = models.ForeignKey(Sede, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Servicios"
        verbose_name_plural = "Servicios"


class Posicion(models.Model):
    PISOS = [
        ('PISO1', 'Piso 1'),
        ('PISO2', 'Piso 2'),
        ('PISO3', 'Piso 3'),
        ('PISO4', 'Piso 4'),
    ]
    piso = models.CharField(max_length=5, choices=PISOS)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Posición"
        verbose_name_plural = "Posiciones"


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
        ('ECCC', 'ECCC'),
        ('ECOL', 'ECOL'),
        ('CNC', 'CNC'),
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

    UBICACIONES = [
        ('CASA', 'Casa'),
        ('CLIENTE', 'Cliente'),
        ('SEDE', 'Sede'),
        ('OTRO', 'Otro'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPOS_DISPOSITIVOS)
    estado = models.CharField(max_length=10, choices=ESTADO_DISPOSITIVO, null=True, blank=True)
    marca = models.CharField(max_length=10, choices=FABRICANTES)
    
    # Razon Social como un atributo de tipo CharField
    razon_social = models.CharField(max_length=100, null=True, blank=True)
    
    regimen = models.CharField(max_length=10, choices=REGIMENES, null=True, blank=True)
    modelo = models.CharField(max_length=50)
    serial = models.CharField(max_length=50, unique=True)
    placa_cu = models.CharField(max_length=50, unique=True, null=True, blank=True)
    
    # Clave foránea a Posicion con related_name para evitar conflicto
    posicion = models.ForeignKey(Posicion, on_delete=models.SET_NULL, null=True, blank=True, related_name='dispositivos')
    
    sede = models.ForeignKey(Sede, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_disco_duro = models.CharField(max_length=10, choices=TIPOS_DISCO_DURO, null=True, blank=True)
    capacidad_disco_duro = models.CharField(max_length=10, choices=CAPACIDADES_DISCO_DURO, null=True, blank=True)
    tipo_memoria_ram = models.CharField(max_length=10, choices=TIPOS_MEMORIA_RAM, null=True, blank=True)
    capacidad_memoria_ram = models.CharField(max_length=10, choices=CAPACIDADES_MEMORIA_RAM, null=True, blank=True)
    ubicacion = models.CharField(max_length=10, choices=UBICACIONES, null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.marca} {self.modelo} (Serial: {self.serial})"

    class Meta:
        verbose_name = "Dispositivo"
        verbose_name_plural = "Dispositivos"


class Movimiento(models.Model):
    dispositivo = models.ForeignKey(Dispositivo, on_delete=models.CASCADE)
    encargado = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fecha_movimiento = models.DateTimeField(auto_now_add=True)
    ubicacion_origen = models.CharField(max_length=50)
    ubicacion_destino = models.CharField(max_length=50)
    observacion = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Movimiento de {self.dispositivo.serial} - {self.fecha_movimiento}"

    class Meta:
        verbose_name = "Movimiento"
        verbose_name_plural = "Movimientos"



@receiver(post_save, sender=Movimiento)
def handle_movimiento_post_save(sender, instance, created, **kwargs):
    if created:
        print(f"Nuevo movimiento creado: {instance}")
    else:
        print(f"Movimiento actualizado: {instance}")


class Historial(models.Model):
    dispositivo = models.ForeignKey(Dispositivo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    cambios = models.TextField()
    tipo_cambio = models.CharField(max_length=100, default='Movimiento registrado')

    def __str__(self):
        return f"Historial de {self.dispositivo.serial} - {self.fecha_modificacion}"

    class Meta:
        verbose_name = "Historial"
        verbose_name_plural = "Historiales"


@receiver(post_save, sender=Movimiento)
def crear_historial_por_movimiento(sender, instance, created, **kwargs):
    if created:
        dispositivo = instance.dispositivo
        usuario = instance.encargado
        cambios = f"El dispositivo {dispositivo.serial} cambió de {instance.ubicacion_origen} a {instance.ubicacion_destino}."
        Historial.objects.create(
            dispositivo=dispositivo,
            usuario=usuario,
            cambios=cambios,
            tipo_cambio='Movimiento registrado'
        )
        
class Estadoproveedor(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre