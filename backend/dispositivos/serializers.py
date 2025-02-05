from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate# type: ignore
from .models import RolUser, Sede, Dispositivo

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['id', 'nombre', 'ciudad', 'direccion']


class RolUserSerializer(serializers.ModelSerializer):
    sedes = SedeSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=False)  # 🔹 Añadido correctamente

    class Meta:
        model = RolUser
        fields = ['id', 'username', 'nombre', 'email', 'rol', 'celular', 'documento', 'sedes', 'password', 'is_active']

    def create(self, validated_data):
        # 🔹 Verificar si 'password' está en los datos antes de intentar hashearlo
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
            
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Verificar si el nombre de usuario y la contraseña son correctos
        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError(_('Credenciales inválidas')) # type: ignore

        data['user'] = user
        return data
    
    
    


class DispositivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispositivo
        fields = '__all__'  # Incluir todos los campos del modelo
