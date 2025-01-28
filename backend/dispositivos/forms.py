from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import RolUser, Sede, Servicios, Posicion, Dispositivo, Movimiento, Estadoproveedor

# Formulario personalizado para RolUser
class RolUserCreationForm(UserCreationForm):
    class Meta:
        model = RolUser
        fields = ['username', 'rol', 'nombre', 'celular', 'documento', 'email', 'password']

class RolUserChangeForm(UserChangeForm):
    class Meta:
        model = RolUser
        fields = ['username', 'rol', 'nombre', 'celular', 'documento', 'email', 'password']

# Formulario para Sede
class SedeForm(forms.ModelForm):
    class Meta:
        model = Sede
        fields = ['nombre', 'ciudad', 'direccion']

# Formulario para Servicios
class ServiciosForm(forms.ModelForm):
    class Meta:
        model = Servicios
        fields = ['nombre', 'codigo_analitico', 'sede']

# Formulario para Posicion
class PosicionForm(forms.ModelForm):
    class Meta:
        model = Posicion
        fields = ['piso', 'nombre', 'descripcion']

# Formulario para Dispositivo
class DispositivoForm(forms.ModelForm):
    class Meta:
        model = Dispositivo
        fields = [
            'tipo', 'estado', 'marca', 'razon_social', 'regimen', 'modelo', 'serial', 
            'placa_cu', 'posicion', 'sede', 'tipo_disco_duro', 'capacidad_disco_duro', 
            'tipo_memoria_ram', 'capacidad_memoria_ram', 'ubicacion'
        ]

# Formulario para Movimiento
class MovimientoForm(forms.ModelForm):
    class Meta:
        model = Movimiento
        fields = ['dispositivo', 'encargado', 'ubicacion_origen', 'ubicacion_destino', 'observacion']

# Formulario para Estadoproveedor
class EstadoproveedorForm(forms.ModelForm):
    class Meta:
        model = Estadoproveedor
        fields = ['nombre']
