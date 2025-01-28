from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string




@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Inicio de sesión exitoso", "username": user.username})
    else:
        return Response({"error": "Credenciales inválidas"}, status=401)


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
import logging

# Configuración de logging
logger = logging.getLogger(__name__)

# Vista para enviar un enlace de restablecimiento de contraseña
@api_view(['POST'])
def reset_password_request(request):
    email = request.data.get('email', '').strip().lower()  # Normaliza el correo
    logger.info(f"Solicitud de restablecimiento para: {email}")

    if not email:
        return Response({"error": "El correo es obligatorio."}, status=400)

    try:
        user = User.objects.get(email=email)

        # Genera el enlace para restablecer la contraseña
        reset_url = f"http://localhost:3000/reset-password?email={email}"

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


# Vista para cambiar la contraseña directamente
@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email', '').strip().lower()  # Normaliza el correo
    new_password = request.data.get('password', '').strip()  # Nueva contraseña

    if not email or not new_password:
        return Response({"error": "Correo y nueva contraseña son obligatorios."}, status=400)

    # Validación de la longitud de la contraseña
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


