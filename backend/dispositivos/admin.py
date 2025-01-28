from django.contrib import admin # type: ignore
from .models import Sede, Servicios, Posicion, Dispositivo, Movimiento, Estadoproveedor, Historial

class SedeAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ciudad', 'direccion')
    search_fields = ('nombre', 'ciudad')
    list_filter = ('ciudad',)

class ServiciosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'codigo_analitico', 'sede')
    search_fields = ('nombre', 'codigo_analitico')
    list_filter = ('sede',)

class PosicionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)
    list_filter = ('nombre',)

class DispositivoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'marca', 'modelo', 'serial', 'razon_social', 'sede', 'estado')
    search_fields = ('serial', 'modelo', 'marca', 'razon_social')
    list_filter = ('tipo', 'estado', 'sede', 'razon_social', 'ubicacion')
    list_editable = ('estado',)
    
    # Puedes agregar un filtro de búsqueda por 'razon_social' o 'modelo'
    ordering = ('modelo',)

class MovimientoAdmin(admin.ModelAdmin):
    list_display = ('dispositivo', 'encargado', 'fecha_movimiento', 'ubicacion_origen', 'ubicacion_destino')
    search_fields = ('dispositivo_serial', 'encargado_username', 'ubicacion_origen', 'ubicacion_destino')
    list_filter = ('fecha_movimiento', 'ubicacion_origen', 'ubicacion_destino')

class EstadoproveedorAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)

class HistorialAdmin(admin.ModelAdmin):
    list_display = ('dispositivo', 'usuario', 'fecha_modificacion', 'tipo_cambio', 'cambios')
    search_fields = ('dispositivo_serial', 'usuario_username', 'tipo_cambio')
    list_filter = ('fecha_modificacion', 'tipo_cambio')

# Registro de los modelos en el admin
admin.site.register(Sede, SedeAdmin)
admin.site.register(Servicios, ServiciosAdmin)
admin.site.register(Posicion, PosicionAdmin)
admin.site.register(Dispositivo, DispositivoAdmin)
admin.site.register(Movimiento, MovimientoAdmin)
admin.site.register(Estadoproveedor, EstadoproveedorAdmin)
admin.site.register(Historial, HistorialAdmin)