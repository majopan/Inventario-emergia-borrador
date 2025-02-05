import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaUser, FaEdit, FaPlus } from "react-icons/fa";
import "./UsuariosExistentes.css";

const UsuariosExistentes = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    nombre: "",
    email: "",
    documento: "",
    celular: "",
    rol: "usuario",
    password: "",
    confirm_password: "",
  });

  // Fetch the list of users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/usuarios/");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setUsers([]);
    }
  }, []);

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dusuarios/${userId}/`);
      setSelectedUser(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error);
    }
  };

  // Edit user
  const editUser = async (userId, updatedUserData) => {
    try {
      if (!updatedUserData.nombre || !updatedUserData.email || !updatedUserData.username) {
        console.error("Por favor, complete todos los campos obligatorios.");
        return;
      }

      await axios.put(`http://127.0.0.1:8000/api/editusuarios/${userId}/`, updatedUserData);
      console.log("Usuario editado exitosamente.");
      fetchUsers();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  // Toggle user status (activate/deactivate)
  const toggleUserStatus = async (userId, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://127.0.0.1:8000/api/deusuarios/${userId}/`);
        console.log("Usuario desactivado exitosamente.");
      } else {
        await axios.put(`http://127.0.0.1:8000/api/activarusuarios/${userId}/`);
        console.log("Usuario activado exitosamente.");
      }
      fetchUsers();
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  // Add new user
  const addUser = async () => {
    if (!newUser.nombre || !newUser.email || !newUser.password || !newUser.username) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (newUser.password !== newUser.confirm_password) {
      console.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      const usuarioData = {
        username: newUser.username,
        nombre: newUser.nombre,
        email: newUser.email,
        documento: newUser.documento,
        celular: newUser.celular,
        rol: newUser.rol,
        password: newUser.password,
        confirm_password: newUser.confirm_password,
      };

      await axios.post("http://127.0.0.1:8000/api/register/", usuarioData);
      console.log("Usuario agregado exitosamente.");
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="records-container">
      <div className="user-card">
        <div className="card-header">
          <h2>Usuarios existentes</h2>
          <button className="add-user-btn" onClick={() => setShowForm(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="user-list">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-avatar">
                  <FaUser />
                </div>
                <div className="user-info" onClick={() => fetchUserDetails(user.id)}>
                  <div className="user-name">{user.nombre}</div>
                  <div className="user-access">
                    {user.rol === "admin" ? "Acceso total" : "Acceso limitado"}
                  </div>
                </div>
                <div className="user-actions">
                  <button className="action-button edit" onClick={() => fetchUserDetails(user.id)}>
                    <FaEdit />
                  </button>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.is_active}
                      onChange={() => toggleUserStatus(user.id, user.is_active)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>No hay usuarios disponibles.</p>
          )}
        </div>

        {/* Modal for viewing and editing user details */}
        {showDetailModal && selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h2>Detalles del usuario</h2>
              <input
                type="text"
                value={selectedUser.nombre || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, nombre: e.target.value })}
                placeholder="Nombre"
              />
              <input
                type="text"
                value={selectedUser.username || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                placeholder="Nombre de usuario"
              />
              <input
                type="email"
                value={selectedUser.email || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                placeholder="Correo electrónico"
              />
              <input
                type="text"
                value={selectedUser.documento || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, documento: e.target.value })}
                placeholder="Documento de identidad"
              />
              <button onClick={() => editUser(selectedUser.id, selectedUser)}>Guardar cambios</button>
              <button className="close-modal-btn" onClick={() => setShowDetailModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal for adding new user */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h2>Agregar Usuario</h2>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombre completo"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Documento de identidad"
                value={newUser.documento}
                onChange={(e) => setNewUser({ ...newUser, documento: e.target.value })}
              />
              <input
                type="text"
                placeholder="Número de celular"
                value={newUser.celular}
                onChange={(e) => setNewUser({ ...newUser, celular: e.target.value })}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={newUser.confirm_password}
                onChange={(e) => setNewUser({ ...newUser, confirm_password: e.target.value })}
              />
              <select value={newUser.rol} onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <button onClick={addUser}>Agregar</button>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuariosExistentes;
