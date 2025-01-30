from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.crypto import get_random_string
import logging
from .models import RolUser  # Asegúrate de que RolUser esté correctamente configurado

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
        return Response({"error": "El correo es un campo obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = RolUser.objects.get(email=email)
    except RolUser.DoesNotExist:
        return Response({"error": "El correo no existe."}, status=status.HTTP_404_NOT_FOUND)

    try:
        subject = "Solicitud de restablecimiento de contraseña"
        message = f"""
        Estimado/a {user.username or user.email},

        Hemos recibido una solicitud para restablecer la contraseña asociada a tu cuenta. Si fuiste tú quien solicitó este cambio, te pedimos que sigas los pasos indicados a continuación para completar el proceso de restablecimiento:

        1. Haz clic en el siguiente enlace para acceder a la página de restablecimiento de contraseña:  
        {settings.FRONTEND_URL}/reset-password?email={email}
        
        2. Ingresa tu nueva contraseña en el formulario proporcionado. Asegúrate de que tu nueva contraseña cumpla con los requisitos de seguridad: 
            - Al menos 8 caracteres
            - Una combinación de letras, números y caracteres especiales
        
        3. Una vez que hayas ingresado tu nueva contraseña, haz clic en el botón de "Restablecer contraseña" para finalizar el proceso.

        Si no solicitaste este cambio, por favor ignora este correo. No se realizarán modificaciones en tu cuenta y no se enviarán más correos de restablecimiento.

        Si tienes algún problema o no estás seguro de haber recibido este correo de manera legítima, por favor, contacta con nuestro equipo de soporte para recibir asistencia.

        Saludos cordiales,
        El equipo de soporte
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

        return Response({"message": "Revisa tu correo electrónico."}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error al enviar el correo: {str(e)}")
        return Response({"error": "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





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