import React, { useState } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import '../styles/ForgotPassword.css';  // Asegúrate de importar este archivo

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la solicitud de restablecimiento de contraseña
    console.log("Restablecer contraseña para:", email);
  };

  return (
    <div className="container">
      <div className="formw"> {/* Aplica la clase .formw aquí */}
        <div className="forgot-password-container">
          <form onSubmit={handleSubmit}>
            <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
            <span>Restablecer tu contraseña</span>
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
