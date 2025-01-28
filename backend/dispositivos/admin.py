from django.contrib import admin # type: ignore
from .models import Sede, Servicios, Posicion, Dispositivo, Movimiento, Estadoproveedor, Historial, RolUser

# Admin para RolUser
@admin.register(RolUser)
class RolUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'rol', 'nombre', 'email', 'celular', 'documento')
    search_fields = ('username', 'nombre', 'email', 'documento')
    list_filter = ('rol',)

# Admin para Sede
@admin.register(Sede)
class SedeAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ciudad', 'direccion')
    search_fields = ('nombre', 'ciudad')
    list_filter = ('ciudad',)

# Admin para Servicios
@admin.register(Servicios)
class ServiciosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'codigo_analitico', 'sede')
    search_fields = ('nombre', 'codigo_analitico')
    list_filter = ('sede',)

# Admin para Posicion
@admin.register(Posicion)
class PosicionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'piso', 'descripcion')
    search_fields = ('nombre',)
    list_filter = ('piso',)

# Admin para Dispositivo
@admin.register(Dispositivo)
class DispositivoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'marca', 'modelo', 'serial', 'razon_social', 'sede', 'estado', 'ubicacion')
    search_fields = ('serial', 'modelo', 'marca', 'razon_social')
    list_filter = ('tipo', 'estado', 'sede', 'razon_social', 'ubicacion')
    list_editable = ('estado',)
    ordering = ('modelo',)

# Admin para Movimiento
@admin.register(Movimiento)
class MovimientoAdmin(admin.ModelAdmin):
    list_display = ('dispositivo', 'encargado', 'fecha_movimiento', 'ubicacion_origen', 'ubicacion_destino')
    search_fields = ('dispositivo__serial', 'encargado__username', 'ubicacion_origen', 'ubicacion_destino')
    list_filter = ('fecha_movimiento', 'ubicacion_origen', 'ubicacion_destino')

# Admin para Estadoproveedor
@admin.register(Estadoproveedor)
class EstadoproveedorAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)

# Admin para Historial
@admin.register(Historial)
class HistorialAdmin(admin.ModelAdmin):
    list_display = ('dispositivo', 'usuario', 'fecha_modificacion', 'tipo_cambio', 'cambios')
    search_fields = ('dispositivo__serial', 'usuario__username', 'tipo_cambio')
    list_filter = ('fecha_modificacion', 'tipo_cambio')
