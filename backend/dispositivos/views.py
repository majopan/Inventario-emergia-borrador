from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import RolUser, Sede
import logging

logger = logging.getLogger(__name__)

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
        if user.rol == 'admin':
            sedes_permitidas = Sede.objects.all()
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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import RolUser, Sede
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def register_user_view(request):
    """
    Registra un nuevo usuario desde el formulario del frontend.
    """
    data = request.data

    # Obtener y validar los campos del formulario
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    confirm_password = data.get('confirmPassword', '').strip()
    email = data.get('email', '').strip().lower()
    nombre = data.get('nombre', '').strip()
    celular = data.get('celular', '').strip()
    documento = data.get('documento', '').strip()
    rol = data.get('rol', 'coordinador')
    sedes_ids = data.get('sedes', [])

    # Validaciones básicas
    if not username or not password or not email:
        return Response({"error": "Nombre de usuario, contraseña y correo son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

    if password != confirm_password:
        return Response({"error": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

    if RolUser.objects.filter(username=username).exists():
        return Response({"error": "El nombre de usuario ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

    if RolUser.objects.filter(email=email).exists():
        return Response({"error": "El correo ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

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
            is_active=True
        )

        # Asignar sedes al usuario
        sedes = Sede.objects.filter(id__in=sedes_ids)
        user.sedes.set(sedes)
        user.save()

        return Response({"message": "Usuario registrado exitosamente."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"Error al registrar el usuario: {str(e)}")
        return Response({"error": "Ocurrió un error al registrar el usuario."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import RolUser
from .serializers import RolUserSerializer

@api_view(['POST'])
def register_user_view(request):
    """
    Vista para registrar un nuevo usuario desde el formulario.
    """
    serializer = RolUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def reset_password_request(request):
    """
    Solicita el restablecimiento de contraseña.
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
        Hemos recibido una solicitud para restablecer la contraseña asociada a tu cuenta.
        {settings.FRONTEND_URL}/reset-password?email={email}
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

@api_view(['GET'])
def get_sedes_view(request):
    """
    Devuelve una lista de sedes disponibles.
    """
    try:
        sedes = Sede.objects.all().values('id', 'nombre', 'ciudad', 'direccion')
        return Response({"sedes": list(sedes)}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error al obtener las sedes: {str(e)}")
        return Response({"error": "Ocurrió un error al obtener las sedes."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import RolUser
from .serializers import RolUserSerializer

@api_view(['GET'])
def get_users_view(request):
    users = RolUser.objects.all()
    serializer = RolUserSerializer(users, many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import RolUser
from .serializers import RolUserSerializer

@api_view(['GET'])
def get_user_detail_view(request, user_id):
    """
    Vista para obtener los detalles de un usuario específico.
    """
    user = get_object_or_404(RolUser, id=user_id)
    serializer = RolUserSerializer(user)
    return Response(serializer.data)

