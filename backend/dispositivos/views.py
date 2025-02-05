
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import RolUser, Sede , Dispositivo
import logging
from rest_framework import viewsets
logger = logging.getLogger(__name__)
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from django.contrib.auth.models import User
from .serializers import RolUserSerializer



@api_view(['GET' ])
@permission_classes([IsAuthenticated])  # Solo los usuarios autenticados pueden acceder
def get_users_view(request):
    """
    Obtiene la lista de usuarios.
    """
    # Obtén los usuarios de la base de datos (en tu caso RolUser)
    users = RolUser.objects.all()
    
    # Serializa la lista de usuarios
    serializer = RolUserSerializer(users, many=True)
    
    # Devuelve la lista de usuarios serializada
    return Response(serializer.data)

class RolUserViewSet(viewsets.ModelViewSet):
    queryset = RolUser.objects.all()
    serializer_class = RolUserSerializer

@api_view(['GET' , 'POST'])
def login_view(request):
    """
    Autentica a un usuario con su nombre de usuario y contraseña.
    """
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Definir las sedes disponibles para el usuario
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
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import RolUser, Sede
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import RolUser
from .serializers import RolUserSerializer
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)


@api_view(['GET'])
def get_users_view(request):
    users = RolUser.objects.all()
    serializer = RolUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail_view(request, user_id):
    try:
        user = RolUser.objects.get(id=user_id)
    except RolUser.DoesNotExist:
        return Response({"error": "Usuario no encontrado."}, status=404)

    serializer = RolUserSerializer(user)
    return Response(serializer.data, status=200)


@api_view(['PUT'])
@permission_classes([AllowAny])
def deactivate_user_view(request, user_id):
    """
    Desactiva un usuario cambiando el campo 'is_active' a False.
    """
    try:
        user = RolUser.objects.get(id=user_id)
    except RolUser.DoesNotExist:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    # Desactivar usuario
    user.is_active = False
    user.save()

    return Response({"message": "Usuario desactivado exitosamente."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_detail_view(request, user_id):
    """
    Devuelve los detalles de un usuario específico.
    """
    try:
        # Obtener el usuario por ID
        user = RolUser.objects.get(id=user_id)
    except RolUser.DoesNotExist:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    # Serializar y devolver los datos del usuario
    serializer = RolUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET' , 'POST'])
@permission_classes([AllowAny])
def register_user_view(request):
    """
    Registra un nuevo usuario desde el formulario del frontend.
    """
    data = request.data

    # Obtener y validar los campos del formulario
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    confirm_password = data.get('confirm_password', '').strip()
    email = data.get('email', '').strip().lower()
    nombre = data.get('nombre', '').strip()
    celular = data.get('celular', '').strip()
    documento = data.get('documento', '').strip()
    rol = data.get('rol', 'coordinador')
    sedes_ids = data.get('sedes', [])

    # Validaciones básicas
  

    if password != confirm_password:
        return Response({"error": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)



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
from .serializers import RolUserSerializer , DispositivoSerializer




@api_view(['GET' , 'POST'])
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

@api_view(['GET' , 'POST'])
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

@api_view(['GET' , 'POST'])
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



@api_view(['PUT'])
@permission_classes([AllowAny])
def edit_user_view(request, user_id):
    try:
        user = RolUser.objects.get(id=user_id)
    except RolUser.DoesNotExist:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    # Serializar y actualizar datos
    serializer = RolUserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuario editado exitosamente."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def dispositivo_view(request):
    """
    Maneja la creación y listado de dispositivos.
    """

    if request.method == 'GET':
        # Obtener todos los dispositivos
        dispositivos = Dispositivo.objects.all()
        serializer = DispositivoSerializer(dispositivos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # Validar y crear un nuevo dispositivo
        data = request.data

        # Obtener los campos del formulario
        tipo = data.get('tipo', '').strip()
        marca = data.get('marca', '').strip()
        modelo = data.get('modelo', '').strip()
        serial = data.get('serial', '').strip()
        estado = data.get('estado', '').strip()
        capacidad_memoria_ram = data.get('capacidad_memoria_ram', '').strip()
        capacidad_disco_duro = data.get('capacidad_disco_duro', '').strip()

        # Validaciones básicas
        if not tipo or not marca or not modelo or not serial:
            return Response({"error": "Los campos tipo, marca, modelo y serial son obligatorios."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        if Dispositivo.objects.filter(serial=serial).exists():
            return Response({"error": "Ya existe un dispositivo con este número de serial."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Crear el dispositivo
            dispositivos = Dispositivo.objects.create(
                tipo=tipo,
                marca=marca,
                modelo=modelo,
                serial=serial,
                estado=estado,
                capacidad_memoria_ram=capacidad_memoria_ram,
                capacidad_disco_duro=capacidad_disco_duro,
            )
            return Response({"message": "Dispositivo registrado exitosamente."}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error al registrar el dispositivo: {str(e)}")
            return Response({"error": "Ocurrió un error al registrar el dispositivo."}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)