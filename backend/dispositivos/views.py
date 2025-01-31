from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.utils.crypto import get_random_string
from django.conf import settings
import logging

from .models import RolUser, Sede

# Configuración de logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def register_user(request):
    """
    Registra un nuevo usuario. Los administradores tienen acceso a todas las sedes por defecto.
    """
    data = request.data
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    email = data.get('email', '').strip().lower()
    rol = data.get('rol', 'coordinador')
    nombre = data.get('nombre', '').strip()
    celular = data.get('celular', '').strip()
    documento = data.get('documento', '').strip()
    sede_ids = data.get('sedes', [])

    if not username or not password or not email:
        return Response({"error": "Nombre de usuario, contraseña y correo son obligatorios."}, status=400)

    if RolUser.objects.filter(username=username).exists():
        return Response({"error": "El nombre de usuario ya está registrado."}, status=400)

    if RolUser.objects.filter(email=email).exists():
        return Response({"error": "El correo ya está registrado."}, status=400)

    try:
        # Crear el usuario
        user = RolUser.objects.create(
            username=username,
            email=email,
            rol=rol,
            nombre=nombre,
            celular=celular,
            documento=documento,
            password=make_password(password),
        )

        # Asignar todas las sedes si el usuario es administrador
        if rol == 'admin':
            sedes = Sede.objects.all()
        else:
            sedes = Sede.objects.filter(id__in=sede_ids)

        user.sedes.set(sedes)
        user.save()

        return Response({"message": "Usuario registrado exitosamente."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"Error al registrar el usuario: {str(e)}")
        return Response({"error": "Ocurrió un error al registrar el usuario."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def login_view(request):
    """
    Autentica a un usuario con su nombre de usuario y contraseña. Devuelve las sedes permitidas según su rol.
    """
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        return Response({"error": "El nombre de usuario y la contraseña son obligatorios."}, status=400)

    user = authenticate(username=username, password=password)

    if user is not None:
        # Si es administrador, devolver todas las sedes
        if user.rol == 'admin':
            sedes_permitidas = Sede.objects.all()
        # Si es coordinador, devolver solo las sedes asignadas
        elif user.rol == 'coordinador':
            sedes_permitidas = user.sedes.all()
        else:
            return Response({"error": "Rol no autorizado."}, status=403)

        return Response({
            "message": "Inicio de sesión exitoso",
            "username": user.username,
            "rol": user.rol,
            "sedes": list(sedes_permitidas.values("id", "nombre", "ciudad", "direccion"))
        })
    else:
        return Response({"error": "Credenciales inválidas."}, status=401)



@api_view(['GET'])
def get_sedes_view(request):
    """
    Devuelve una lista de sedes disponibles con información básica.
    """
    try:
        sedes = Sede.objects.all().values('id', 'nombre', 'ciudad', 'direccion')
        return Response({"sedes": list(sedes)}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error al obtener las sedes: {str(e)}")
        return Response({"error": "Ocurrió un error al obtener las sedes."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def reset_password_request(request):
    """
    Solicita el restablecimiento de contraseña enviando un correo con instrucciones.
    """
    email = request.data.get('email', '').strip().lower()
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

        Saludos cordiales,
        El equipo de soporte
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

        return Response({"message": "Revisa tu correo electrónico."}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error al enviar el correo: {str(e)}")
        return Response({"error": "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def reset_password(request):
    """
    Restablece la contraseña del usuario.
    """
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
