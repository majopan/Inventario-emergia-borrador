from django.contrib import admin # type: ignore

# Register your models here.
from .models import Dispositivo, Posicion, Historial

admin.site.register(Dispositivo)
admin.site.register(Posicion)
admin.site.register(Historial)