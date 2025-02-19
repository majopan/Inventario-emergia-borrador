from django.db import models # type: ignore
from django.contrib.auth.models import AbstractUser # type: ignore
from django.db.models.signals import post_save # type: ignore
from django.dispatch import receiver # type: ignore
from django.conf import settings # type: ignore
from django.core.exceptions import ValidationError

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
    is_active = models.BooleanField(default=True)
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
    sedes = models.ManyToManyField(Sede, related_name="servicios")
    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Servicios"
        verbose_name_plural = "Servicios"



class Posicion(models.Model):
    """
    Modelo que representa una posición en una sede.
    """

    ESTADOS = [
        ('disponible', 'Disponible'),
        ('ocupado', 'Ocupado'),
        ('reservado', 'Reservado'),
        ('inactivo', 'Inactivo'),
    ]

    COLORES = {
        'disponible': 'green',
        'ocupado': 'red',
        'reservado': 'yellow',
        'inactivo': 'gray',
    }

    PISOS = [
        ('PISO1', 'Piso 1'),
        ('PISO2', 'Piso 2'),
        ('PISO3', 'Piso 3'),
        ('PISO4', 'Piso 4'),
        ('TORRE1', 'Torre 1'),
    ]

    # Relaciones
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE, related_name='posiciones')
    servicio = models.ForeignKey('Servicios', on_delete=models.SET_NULL, null=True, blank=True, related_name='posiciones')

    # Atributos de ubicación
    nombre = models.CharField(max_length=100)  # Nombre de la posición
    piso = models.CharField(max_length=10, choices=PISOS)
    coordenada_x = models.IntegerField()
    coordenada_y = models.IntegerField()

    # Estado y visualización
    estado = models.CharField(max_length=10, choices=ESTADOS, default='disponible')
    color = models.CharField(max_length=10, default='green')  # Se actualizará automáticamente

    def save(self, *args, **kwargs):
        """Antes de guardar, aseguramos que el color coincida con el estado."""
        self.color = self.COLORES.get(self.estado, 'gray')
        super(Posicion, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} - {self.sede.nombre} ({self.piso})"

    class Meta:
        verbose_name = "Posición"
        verbose_name_plural = "Posiciones"

        
    def save(self, *args, **kwargs):
        if self.dispositivos.count() >= 3:
            raise ValidationError("No se pueden asignar más de 3 dispositivos a esta posición.")
        super(Posicion, self).save(*args, **kwargs)


class Dispositivo(models.Model):
    TIPOS_DISPOSITIVOS = [
        ('COMPUTADOR', 'Computador'),
        ('DESKTOP', 'Desktop'),
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
    
    SISTEMAS_OPERATIVOS = [
        ('NA', 'No Aplica'),
        ('SERVER', 'Server'),
        ('WIN10', 'Windows 10'),
        ('WIN11', 'Windows 11'),
        ('WIN7', 'Windows 7'),
        ('VACIO', 'Sin Sistema Operativo'),
    ]

    PROCESADORES = [
        ('AMD_A12', 'AMD A12'),
        ('AMD_A8_5500B', 'AMD A8-5500B APU'),
        ('AMD_RYZEN', 'AMD RYZEN'),
        ('AMD_RYZEN_3_2200GE', 'AMD Ryzen 3 2200GE'),
        ('I3_2100', 'Intel Core i3 2100'),
        ('I3_6200U', 'Intel Core i3 6200U'),
        ('I5_4430S', 'Intel Core i5 4430s'),
        ('I5_4460', 'Intel Core i5 4460'),
        ('I5_4590', 'Intel Core i5 4590'),
        ('I5_4600', 'Intel Core i5 4600'),
        ('I5_4670', 'Intel Core i5 4670'),
        ('I5_4750', 'Intel Core i5 4750'),
        ('I5_6500', 'Intel Core i5 6500'),
        ('I5_6500T', 'Intel Core i5 6500T'),
        ('I5_7500', 'Intel Core i5 7500'),
        ('I5_8400T', 'Intel Core i5 8400T'),
        ('I5_8500', 'Intel Core i5 8500'),
        ('I5_10TH', 'Intel Core i5 10th Gen'),
        ('I5_11TH', 'Intel Core i5 11th Gen'),
        ('I5_12TH', 'Intel Core i5 12th Gen'),
        ('I7_8TH', 'Intel Core i7 8th Gen'),
        ('I7_12TH', 'Intel Core i7 12th Gen'),
        ('I7_13TH', 'Intel Core i7 13th Gen'),
        ('I7_7TH', 'Intel Core i7 7th Gen'),
        ('I7_8565U', 'Intel Core i7 8565U @ 1.80GHz'),
        ('CORE_2_DUO_E7400', 'Intel Core 2 Duo E7400'),
        ('CORE_2_DUO_E7500', 'Intel Core 2 Duo E7500'),
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
    serial = models.CharField(max_length=50, unique=True, db_index=True)
    placa_cu = models.CharField(max_length=50, unique=True, null=True, blank=True)
    
    # Clave foránea a Posicion con related_name para evitar conflicto
    posicion = models.ForeignKey(Posicion, on_delete=models.SET_NULL, null=True, blank=True, related_name='dispositivos')
    
    sede = models.ForeignKey(Sede, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_disco_duro = models.CharField(max_length=10, choices=TIPOS_DISCO_DURO, null=True, blank=True)
    capacidad_disco_duro = models.CharField(max_length=10, choices=CAPACIDADES_DISCO_DURO, null=True, blank=True)
    tipo_memoria_ram = models.CharField(max_length=10, choices=TIPOS_MEMORIA_RAM, null=True, blank=True)
    capacidad_memoria_ram = models.CharField(max_length=10, choices=CAPACIDADES_MEMORIA_RAM, null=True, blank=True)
    ubicacion = models.CharField(max_length=10, choices=UBICACIONES, null=True, blank=True)
    proveedor = models.CharField(max_length=100, null=True, blank=True)  # Nombre del proveedor
    sistema_operativo = models.CharField(max_length=10, choices=SISTEMAS_OPERATIVOS, null=True, blank=True)  # Sistema operativo instalado
    procesador = models.CharField(max_length=50, choices=PROCESADORES, null=True, blank=True)

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
    
    
    
class RegistroActividad(models.Model):
    usuario = models.ForeignKey(RolUser, on_delete=models.CASCADE)
    accion = models.CharField(max_length=255)
    fecha = models.DateTimeField(auto_now_add=True)
    ip_origen = models.GenericIPAddressField()

    def __str__(self):
        return f"{self.usuario.username} - {self.accion} - {self.fecha}"


@receiver(post_save, sender=Dispositivo)
def registrar_movimiento(sender, instance, **kwargs):
    if instance.posicion:  # Si hay una nueva posición asignada
        Movimiento.objects.create(
            dispositivo=instance,
            ubicacion_origen="Desconocido",  # Se puede mejorar con un registro previo
            ubicacion_destino=instance.posicion.nombre,
            encargado=instance.usuario_asignado,  # Si existe un usuario asignado
        )
