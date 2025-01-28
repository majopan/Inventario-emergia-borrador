import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import { Link } from "react-router-dom";
import '../styles/Login.css';

import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    setForgotPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Bienvenido ${data.username}`);
        // Redirige al usuario a otra página, si es necesario
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container">
      {!forgotPassword ? (
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
            <span>Iniciar sesión</span>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
