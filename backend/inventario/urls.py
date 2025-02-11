"""
URL configuration for inventario project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from dispositivos import views
from rest_framework.routers import DefaultRouter
from dispositivos.views import RolUserViewSet

# Configuración del router para las vistas de usuario con ViewSet
router = DefaultRouter()
router.register(r'usuarios', RolUserViewSet)

# Definición de las rutas URL
urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # Autenticación y gestión de usuarios
    path('api/login/', views.login_view, name='login'),
    path('api/register/', views.register_user_view, name='register_user_view'),
    path('api/editusuarios/<int:user_id>/', views.edit_user_view, name='edit_user_view'),
    path('api/dusuarios/<int:user_id>/', views.get_user_detail_view, name='get_user_detail_view'),

    # Activación y desactivación de usuarios
    path('api/activarusuarios/<int:user_id>/', views.activate_user_view, name='activate_user_view'),
    path('api/deusuarios/<int:user_id>/', views.deactivate_user_view, name='deactivate_user_view'),

    # Gestión de contraseñas
    path('api/reset-password-request/', views.reset_password_request, name='reset_password_request'),
    path('api/reset-password/', views.reset_password, name='reset_password'),

    # Rutas para sedes y dispositivos
    path('api/sedes/', views.get_sedes_view, name='get_sedes_view'),
    path('api/dispositivos/', views.dispositivo_view, name='dispositivo_view'),

    # Rutas para usuarios (detalles y lista)
    path('api/usuarios/', views.get_users_view, name='get_users_view'),
    path('api/usuarios/<int:user_id>/', views.user_detail_view, name='user_detail'),

    # Incluir las rutas generadas por el router
    path('api/', include(router.urls)),
    
    # rutas de json plano
    path('api/posiciones/', views.posiciones_view, name='posicion-view'),
]


