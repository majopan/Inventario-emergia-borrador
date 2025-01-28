from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.crypto import get_random_string
import logging

# Configuración de logging
logger = logging.getLogger(__name__)

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
        return Response({"error": "Credenciales inválidas"}, status=401)


# Vista para solicitar un restablecimiento de contraseña
@api_view(['POST'])
def reset_password_request(request):
    """
    Envía un enlace de restablecimiento de contraseña al correo electrónico del usuario.
    """
    email = request.data.get('email', '').strip().lower()  # Normaliza el correo
    logger.info(f"Solicitud de restablecimiento para: {email}")

    if not email:
        return Response({"error": "El correo es obligatorio."}, status=400)

    try:
        user = User.objects.get(email=email)

        # Genera el enlace para restablecer la contraseña
        token = get_random_string(length=32)  # Opcional: puedes generar un token seguro
        reset_url = f"http://localhost:3000/reset-password?email={email}&token={token}"

        # Envía el correo
        subject = "Restablece tu contraseña"
        message = f"Hola {user.username},\n\nUsa el siguiente enlace para restablecer tu contraseña:\n{reset_url}\n\nSi no solicitaste esto, ignora este correo."
        send_mail(subject, message, 'emergiainventario@gmail.com', [email])

        logger.info(f"Correo de restablecimiento enviado a: {email}")
        return Response({"message": "Revisa tu correo para restablecer la contraseña."})
    except User.DoesNotExist:
        logger.warning(f"Intento de restablecimiento para correo no registrado: {email}")
        return Response({"error": "El correo no está registrado."}, status=404)
    except Exception as e:
        logger.error(f"Error al procesar la solicitud de restablecimiento: {str(e)}")
        return Response({"error": "Ocurrió un error. Intenta nuevamente más tarde."}, status=500)


# Vista para cambiar la contraseña
@api_view(['POST'])
def reset_password(request):
    """
    Cambia la contraseña de un usuario utilizando su correo electrónico.
    """
    email = request.data.get('email', '').strip().lower()
    new_password = request.data.get('password', '').strip()

    if not email or not new_password:
        return Response({"error": "Correo y nueva contraseña son obligatorios."}, status=400)

    if len(new_password) < 8:
        return Response({"error": "La contraseña debe tener al menos 8 caracteres."}, status=400)

    try:
        user = User.objects.get(email=email)

        # Actualiza la contraseña del usuario
        user.password = make_password(new_password)
        user.save()

        logger.info(f"Contraseña actualizada correctamente para: {email}")
        return Response({"message": "Contraseña cambiada exitosamente."})
    except User.DoesNotExist:
        logger.warning(f"Intento de cambio de contraseña para correo no registrado: {email}")
        return Response({"error": "El correo no está registrado."}, status=404)
    except Exception as e:
        logger.error(f"Error al cambiar la contraseña: {str(e)}")
        return Response({"error": "Ocurrió un error. Intenta nuevamente más tarde."}, status=500)
