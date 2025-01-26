import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import '../styles/Login.css';

import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    setForgotPassword(false);
  };

  return (
    <div className="container">
      {!forgotPassword ? (
        <div className="form-container sign-in">
          <form>
            <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
            <span>Iniciar sesión</span>
            <input type="username" placeholder="Nombre de usuario" />
            <input type="password" placeholder="Contraseña" />
            {/* Reemplaza el <a> con <Link> */}
            <Link to="/forgot-password" onClick={handleForgotPasswordClick}>¿Olvidaste tu contraseña?</Link>
            <button type="submit">Entrar</button>
          </form>
        </div>
      ) : (
        <ForgotPassword onBackToLogin={handleBackToLoginClick} />
      )}

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <img src={EInventoryLogo} alt="Logo de E-Inventory" className="logo-e" style={{ width: '300px', height: 'auto' }} />
            <p>sistema de inventario y control</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;