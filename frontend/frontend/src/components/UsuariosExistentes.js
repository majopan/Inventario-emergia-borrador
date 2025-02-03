import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../styles/Registro.css';

const UsuariosExistentes = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Función para obtener los usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/usuarios/');
      console.log('Respuesta de la API:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('La respuesta de la API no tiene la estructura esperada:', response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  // Llamar a fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  // Función para manejar el clic en un usuario
  const handleUserClick = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  // Función para eliminar un usuario
  const deleteUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  return (
    <div className="card">
      <h2>Usuarios existentes</h2>
      <button className="add-user-btn" onClick={toggleModal}>
        <FaUserPlus />
      </button>
      <div className="users-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-item" onClick={() => handleUserClick(user)}>
              <FaUser className="user-icon" />
              <div className="user-info">
                <strong>{user.nombre}</strong>
                <p>
                  Acceso a{' '}
                  {user.rol === 'admin'
                    ? 'toda la información de las sedes'
                    : `la sede de ${user.sede}`}
                </p>
              </div>
              <div className="user-actions">
                <span className={`status ${user.activo ? 'activo' : 'inactivo'}`}>
                  {user.activo ? 'Activo' : 'Inactivo'}
                </span>
                <button className="edit-btn">
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>

      {/* Modal para mostrar detalles del usuario */}
      {showModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Detalles del Usuario</h3>
            <div>
              <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
              <p><strong>Usuario:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Rol:</strong> {selectedUser.rol}</p>
              <p><strong>Celular:</strong> {selectedUser.celular}</p>
              <p><strong>Documento:</strong> {selectedUser.documento}</p>
              <p><strong>Sedes:</strong></p>
              <ul>
                {selectedUser.sedes && selectedUser.sedes.map((sede) => (
                  <li key={sede.id}>{sede.nombre} - {sede.ciudad}</li>
                ))}
              </ul>
            </div>
            <button className="close-modal-btn" onClick={toggleModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosExistentes;