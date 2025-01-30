from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.crypto import get_random_string
import logging
from .models import RolUser  # Asegúrate de que RolUser esté correctamente configurado

# Configuración de logging
logger = logging.getLogger(_name_)

# Vista para el inicio de sesión
@api_view(['POST'])
def login_view(request):
    """
    Autentica a un usuario con su nombre de usuario y contraseña.
    """
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        return Response({"error": "El nombre de usuario y la contraseña son obligatorios."}, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({"message": "Inicio de sesión exitoso", "username": user.username})
    else:
        return Response({"error": "Credenciales inválidas."}, status=401)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings
from .models import RolUser

@api_view(['POST'])
def reset_password_request(request):
    email = request.data.get('email', '').strip().lower()  # Normaliza el correo
    if not email:
        return Response({"error": "El correo es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = RolUser.objects.get(email=email)
    except RolUser.DoesNotExist:
        return Response({"error": "El correo no está registrado."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Código que puede generar una excepción
        subject = "Restablece tu contraseña"
        message = f"""
        Hola {user.nombre or user.email},

        Usa el siguiente enlace para restablecer tu contraseña:
        {settings.FRONTEND_URL}/reset-password?email={email}

        Si no solicitaste este cambio, ignora este correo.
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

        # Este return debe estar dentro de la función, bien indentado
        return Response({"message": "Revisa tu correo."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error al enviar el correo: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email', '').strip().lower()
    new_password = request.data.get('password', '').strip()

    if not email or not new_password:
        return Response({"error": "Correo y nueva contraseña son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

    if len(new_password) < 8:
        return Response({"error": "La contraseña debe tener al menos 8 caracteres."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = RolUser.objects.get(email=email)
        user.password = make_password(new_password)
        user.save()
        return Response({"message": "Contraseña cambiada exitosamente."}, status=status.HTTP_200_OK)
    except RolUser.DoesNotExist:
        return Response({"error": "El correo no está registrado."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"Error al cambiar la contraseña: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)