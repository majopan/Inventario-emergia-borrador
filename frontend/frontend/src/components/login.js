import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import '../styles/Login.css';

import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la autenticación
    console.log("Formulario enviado");
  };

  // Muestra el componente de recuperación de contraseña
  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  // Regresa al formulario de inicio de sesión
  const handleBackToLoginClick = () => {
    setForgotPassword(false);
  };

  return (
    <div className="container">
      {/* Condicional para mostrar el formulario de inicio de sesión o la recuperación de contraseña */}
      {!forgotPassword ? (
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            {/* Logo de la aplicación */}
            <Logo
              className="logo"
              style={{ width: "220px", height: "auto", padding: "10px" }}
              alt="Logo de la aplicación"
            />

            <span>Iniciar sesión</span>

            {/* Campos de usuario y contraseña */}
            <input type="text" placeholder="Nombre de usuario" required />
            <input type="password" placeholder="Contraseña" required />

            {/* Botón para recuperación de contraseña */}
            <button
              type="button"
              className="link-button"
              onClick={handleForgotPasswordClick}
            >
              ¿Olvidaste tu contraseña?
            </button>

            {/* Botón para enviar el formulario */}
            <button type="submit">Entrar</button>
          </form>
        </div>
      ) : (
        // Componente de recuperación de contraseña
        <ForgotPassword onBackToLogin={handleBackToLoginClick} />
      )}

      {/* Panel lateral con información */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <img
              src={EInventoryLogo}
              alt="Logo de E-Inventory"
              className="logo-e"
              style={{ width: "300px", height: "auto" }}
            />
            <p>Sistema de inventario y control</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;