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
from django.utils.crypto import get_random_string

@api_view(['POST'])
def reset_password_request(request):
    # Extrae el correo electrónico de la solicitud
    email = request.data.get('email')

    try:
        # Busca al usuario con el correo proporcionado
        user = User.objects.get(email=email)
        
        # Genera un token único (podrías guardarlo en la base de datos para validación futura)
        token = get_random_string(length=32)
        
        # Crea la URL de restablecimiento
        reset_url = f"http://localhost:3000/reset-password/{token}"

        # Configura el asunto y el cuerpo del correo
        subject = "Restablece tu contraseña"
        message = (
            f"Hola {user.username},\n\n"
            f"Recibimos una solicitud para restablecer tu contraseña. "
            f"Por favor, haz clic en el siguiente enlace para continuar:\n\n"
            f"{reset_url}\n\n"
            f"Si no realizaste esta solicitud, puedes ignorar este mensaje.\n\n"
            f"Gracias,\n"
            f"El equipo de E-Inventory."
        )

        # Envía el correo
        send_mail(
            subject,
            message,
            'emergiainventario@gmail.com',  # Correo del remitente
            [email],                        # Correo del destinatario
            fail_silently=False,            # Genera error si el correo no se envía
        )

        # Devuelve una respuesta exitosa
        return Response({"message": "Instrucciones enviadas a tu correo electrónico"})
    
    except User.DoesNotExist:
        # Devuelve un error si el correo proporcionado no está registrado
        return Response({"error": "El correo no está registrado"}, status=404)


