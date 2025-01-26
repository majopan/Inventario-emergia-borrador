import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../styles/ForgotPassword.css';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Enviando instrucciones a ${email}`);
  };

  return (
    <div className="form-container forgot-password">
      <form onSubmit={handleSubmit} className="formw">
        <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
        <h4>Restablecer tu contraseña</h4>
        <input
          type="email"
          placeholder="Introduce tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
        <a href=" " onClick={onBackToLogin}>Volver al inicio de sesión</a>
      </form>
    </div>
  );
};

export default ForgotPassword;
