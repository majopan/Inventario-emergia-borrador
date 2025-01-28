import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Para leer parámetros de la URL
import "../styles/ResetPassword.css"; // Estilos opcionales

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // Captura los parámetros de la URL
  const navigate = useNavigate(); // Para redirigir al usuario después
  const email = searchParams.get("email"); // Obtén el correo desde la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar envíos múltiples

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación temprana
    if (!email) {
      setError("No se proporcionó el correo electrónico en el enlace.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(""); // Limpia errores anteriores
    setIsSubmitting(true); // Deshabilita el botón mientras se envía la solicitud

    try {
        const response = await fetch("http://localhost:8000/api/reset-password/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email, // Correo capturado desde la URL
              password, // Nueva contraseña
            }),
          });
          

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Contraseña actualizada correctamente.");
        setTimeout(() => navigate("/"), 3000); // Redirige al inicio tras 3 segundos
      } else {
        setError(data.error || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false); // Habilita el botón nuevamente
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Restablecer contraseña</h2>

        {/* Mensajes de error o éxito */}
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8} // Validación nativa del navegador
          onInput={() => setError("")} // Limpia errores al escribir
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          onInput={() => setError("")}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cambiando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
