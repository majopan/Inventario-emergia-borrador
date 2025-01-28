import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import { Link } from "react-router-dom";
import '../styles/ForgotPassword.css';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Ocurrió un error");
        setMessage("");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="formw">
        <div className="forgot-password-container">
          <form onSubmit={handleSubmit}>
            <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
            <span>Restablecer tu contraseña</span>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar instrucciones</button>
            <Link to="/" onClick={onBackToLogin} className="back-to-login">Volver a Iniciar sesión</Link>
          </form>
        </div>
      </div>

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

export default ForgotPassword;