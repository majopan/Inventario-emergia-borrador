from django.contrib import admin # type: ignore
from .models import Posicion, Dispositivo, Historial, servicios

# Registrar el modelo Posicion
@admin.register(Posicion)
class PosicionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')  # Columnas que se mostrarán en la lista
    search_fields = ('nombre',)  # Permite buscar por el campo 'nombre'

# Registrar el modelo servicios
@admin.register(servicios)
class serviciosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'codigo_analitico', 'sede')  # Columnas a mostrar
    search_fields = ('nombre', 'codigo_analitico', 'sede')  # Campos que puedes buscar
    list_filter = ('sede',)  # Filtro por sede

# Registrar el modelo Dispositivo
@admin.register(Dispositivo)
class DispositivoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'marca', 'modelo', 'serial', 'estado', 'placa_cu', 'posicion')  # Columnas a mostrar
    search_fields = ('modelo', 'serial', 'marca')  # Campos que puedes buscar
    list_filter = ('estado', 'marca', 'tipo')  # Filtros en el panel admin

    # Personalizar los formularios en el panel de administración
    fieldsets = (
        (None, {
            'fields': ('tipo', 'marca', 'modelo', 'serial', 'placa_cu', 'posicion')
        }),
        ('Especificaciones', {
            'fields': ('tipo_disco_duro', 'capacidad_disco_duro', 'tipo_memoria_ram', 'capacidad_memoria_ram'),
        }),
        ('Estado', {
            'fields': ('estado', 'razon_social'),
        }),
    )

    # Hacer que los dispositivos sean más fáciles de editar en línea
    inlines = []

# Registrar el modelo Historial
@admin.register(Historial)
class HistorialAdmin(admin.ModelAdmin):
    list_display = ('dispositivo', 'usuario', 'fecha_modificacion', 'cambios')  # Columnas a mostrar
    search_fields = ('dispositivo__serial', 'usuario__username')  # Permite buscar por el serial del dispositivo o el nombre del usuario
    list_filter = ('fecha_modificacion',)  # Filtro por fecha

