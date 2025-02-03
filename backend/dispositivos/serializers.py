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
