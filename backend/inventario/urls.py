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
from django.urls import path  # type: ignore
from dispositivos import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view, name='login'),
    path('api/register/', views.register_user, name='register_user'),
    path('api/reset-password-request/', views.reset_password_request, name='reset_password_request'),
    path('api/reset-password/', views.reset_password, name='reset_password'),
    path('api/sedes/', views.get_sedes_view, name='get_sedes_view'),
    path('api/usuarios/', views.get_users_view, name='get_users_view'),
    path('api/usuarios/<int:user_id>/', views.get_user_detail_view, name='get_user_detail_view'),  # Nueva ruta para detalles de usuario
]

