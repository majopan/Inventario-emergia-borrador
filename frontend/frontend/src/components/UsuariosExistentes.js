import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../styles/Registro.css';

const UsuariosExistentes = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Función para obtener los usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/usuarios/');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setUsers([]);
    }
  };

  // Función para obtener los detalles de un usuario
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/${userId}/`);
      setSelectedUser(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card">
      <h2>Usuarios existentes</h2>
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-item" onClick={() => fetchUserDetails(user.id)}>
              <FaUser className="user-icon" />
              <div className="user-info">
                <strong>{user.nombre}</strong>
                <p>
                  Acceso a{' '}
                  {user.rol === 'admin'
                    ? 'toda la información de las sedes'
                    : 'información limitada'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>

      {/* Modal para mostrar los detalles del usuario */}
      {showDetailModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Detalles del usuario</h3>
            <p><strong>Nombre completo:</strong> {selectedUser.nombre}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Documento:</strong> {selectedUser.documento}</p>
            <p><strong>Celular:</strong> {selectedUser.celular}</p>
            <p><strong>Rol:</strong> {selectedUser.rol}</p>
            <h4>Sedes asignadas:</h4>
            <ul>
              {selectedUser.sedes.map((sede) => (
                <li key={sede.id}>
                  {sede.nombre} - {sede.ciudad}
                </li>
              ))}
            </ul>
            <button className="close-modal-btn" onClick={() => setShowDetailModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosExistentes;
