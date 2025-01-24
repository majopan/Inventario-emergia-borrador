from django.shortcuts import render, get_object_or_404, redirect # type: ignore
from .models import Dispositivo, Posicion, Historial
from django.contrib.auth.decorators import login_required # type: ignore
from django.contrib import messages # type: ignore

@login_required
def lista_dispositivos(request):
    dispositivos = Dispositivo.objects.all()
    return render(request, 'dispositivos/lista.html', {'dispositivos': dispositivos})

@login_required
def agregar_dispositivo(request):
    if request.method == 'POST':
        # Procesar formulario (validación y guardado)
        # Crear logs si se desea
        pass
    return render(request, 'dispositivos/agregar.html')

@login_required
def editar_dispositivo(request, id):
    dispositivo = get_object_or_404(Dispositivo, id=id)
    if request.method == 'POST':
        # Actualizar datos, crear historial, y validar cambios
        pass
    return render(request, 'dispositivos/editar.html', {'dispositivo': dispositivo})