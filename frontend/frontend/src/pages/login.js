import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import EInventoryLogo from '../assets/E-Inventory.png';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import ForgotPassword from '../components/ForgotPassword';

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sedeId, setSedeId] = useState('');
  const [sedes, setSedes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sede/');
        if (!response.ok) {
          throw new Error('Error al obtener las sedes.');
        }
        const data = await response.json();
        setSedes(data.sedes);
      } catch (err) {
        alert('Error de conexión con el servidor.');
      }
    };

    fetchSedes();
  }, []);

  const handleForgotPasswordClick = () => setForgotPassword(true);
  const handleBackToLoginClick = () => setForgotPassword(false);

  const validateForm = () => {
    if (!username.trim()) {
      alert('Por favor ingresa tu nombre de usuario.');
      return false;
    }

    if (!password.trim()) {
      alert('Por favor ingresa tu contraseña.');
      return false;
    } else if (password.trim().length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (!sedeId) {
      alert('Por favor selecciona una sede.');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, sede_id: sedeId }),
      });

      // Si el servidor responde con un error, lanzar una excepción controlada
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('El usuario ingresado no existe.');
        } else if (response.status === 401) {
          throw new Error('Contraseña incorrecta.');
        } else if (response.status === 403) {
          throw new Error('Tu cuenta está inactiva. Contacta al administrador.');
        } else {
          throw new Error('Error al iniciar sesión. Inténtalo nuevamente.');
        }
      }

      // Si la respuesta es correcta, proceder con el login
      const data = await response.json();
      alert(`Bienvenido ${data.username}`);
      navigate('/dashboard');

    } catch (err) {
      alert(err.message);  // Muestra la alerta con el error exacto
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        {!forgotPassword ? (
          <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
              <Logo className="logo" style={{ width: '220px', height: 'auto', padding: '10px' }} />
              <span>Iniciar sesión</span>

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

              <select value={sedeId} onChange={(e) => setSedeId(e.target.value)}>
                <option value="">Seleccionar sede</option>
                {sedes.map(sede => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre} - {sede.ciudad}
                  </option>
                ))}
              </select>

              <Link to="#" onClick={handleForgotPasswordClick}>¿Olvidaste tu contraseña?</Link>
              <button type="submit">Entrar</button>
            </form>
          </div>
        ) : (
          <ForgotPassword onBackToLogin={handleBackToLoginClick} />
        )}

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <img src={EInventoryLogo} alt="Logo de E-Inventory" className="logo-e" />
              <p>Sistema de inventario y control</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
