from rest_framework import serializers
from .models import RolUser, Sede

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['id', 'nombre', 'ciudad', 'direccion']

class RolUserSerializer(serializers.ModelSerializer):
    sedes = SedeSerializer(many=True, read_only=True)  # Relación ManyToMany

    class Meta:
        model = RolUser
        fields = ['id', 'username', 'nombre', 'email', 'rol', 'celular', 'documento', 'sedes']


from rest_framework import serializers
from .models import RolUser, Sede

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['id', 'nombre', 'ciudad', 'direccion']

class RolUserSerializer(serializers.ModelSerializer):
    sedes = SedeSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = RolUser
        fields = ['id', 'username', 'nombre', 'email', 'rol', 'celular', 'documento', 'sedes', 'password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = RolUser(**validated_data)
        user.set_password(password)  # Encripta la contraseña
        user.save()
        return user
