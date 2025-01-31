import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../styles/Registro.css';

const UsuariosExistentes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener los usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/usuarios/');
      console.log('Respuesta de la API:', response.data); // Inspecciona la respuesta

      // Asegúrate de que la respuesta tenga la estructura esperada
      if (response.data && Array.isArray(response.data.usuarios)) {
        setUsuarios(response.data.usuarios);
      } else {
        console.error('La respuesta de la API no tiene la estructura esperada:', response.data);
        setUsuarios([]); // Inicializa usuarios como un array vacío para evitar errores
      }
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      setUsuarios([]); // Inicializa usuarios como un array vacío en caso de error
    }
  };

  // Llamar a fetchUsuarios cuando el componente se monta
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  // Función para eliminar un usuario
  const eliminarUsuario = (id) => {
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevosUsuarios); // Actualiza el estado
  };

  // Función para agregar un nuevo usuario
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]); // Actualiza el estado
  };

  return (
    <div className="card">
      <h2>Usuarios existentes</h2>
      <button className="add-user-btn" onClick={toggleModal}>
        <FaUserPlus />
      </button>
      <div className="usuarios-list">
        {Array.isArray(usuarios) && usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <div key={usuario.id} className="usuario-item">
              <FaUser className="user-icon" />
              <div className="usuario-info">
                <strong>{usuario.nombre}</strong>
                <p>
                  Acceso a{' '}
                  {usuario.rol === 'admin'
                    ? 'toda la información de las sedes'
                    : `la sede de ${usuario.sede}`}
                </p>
              </div>
              <div className="usuario-actions">
                <span className={`status ${usuario.activo ? 'activo' : 'inactivo'}`}>
                  {usuario.activo ? 'Activo' : 'Inactivo'}
                </span>
                <button className="edit-btn">
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => eliminarUsuario(usuario.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nuevo usuario</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const nuevoUsuario = {
                  id: usuarios.length + 1, // Generar un ID único
                  nombre: e.target.nombre.value,
                  rol: e.target.rol.value,
                  sede: e.target.sede.value,
                  activo: true,
                };
                agregarUsuario(nuevoUsuario); // Agregar el nuevo usuario
                toggleModal(); // Cerrar el modal
              }}
            >
              <input type="text" name="nombre" placeholder="Nombre de usuario" required />
              <input type="email" name="email" placeholder="Correo electrónico" required />
              <select name="rol" required>
                <option value="admin">Administrador</option>
                <option value="coordinador">Coordinador</option>
              </select>
              <input type="text" name="sede" placeholder="Sede" required />
              <button type="submit">Agregar</button>
            </form>
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