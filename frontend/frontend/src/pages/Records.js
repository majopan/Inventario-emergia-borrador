    import React, { useEffect, useState } from 'react';
    import { FaUser, FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
    import '../styles/Registro.css';

    const Registro = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/usuarios/');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
        };

        fetchUsuarios();
    }, []);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="dashboard-container">
        <div className="dashboard-image-container">
            <img
            src={require('../assets/E-Inventory.png')}
            alt="E-Inventory"
            className="dashboard-image"
            />
        </div>

        <div className="dashboard-content">
            <div className="card-usuarios">
            <h2>Usuarios existentes</h2>
            <button className="add-user-btn" onClick={toggleModal}>
                <FaUserPlus />
            </button>
            <div className="usuarios-list">
                {usuarios.map(usuario => (
                <div key={usuario.id} className="usuario-item">
                    <FaUser className="user-icon" />
                    <div className="usuario-info">
                    <strong>{usuario.nombre}</strong>
                    <p>
                        Acceso a {usuario.rol === 'admin' ? 'toda la información de las sedes' : `la sede de ${usuario.sede}`}
                    </p>
                    </div>
                    <div className="usuario-actions">
                    <span className={`status ${usuario.activo ? 'activo' : 'inactivo'}`}>
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    <button className="edit-btn">
                        <FaEdit />
                    </button>
                    <button className="delete-btn">
                        <FaTrashAlt />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

        {showModal && (
            <div className="modal">
            <div className="modal-content">
                <h3>Agregar nuevo usuario</h3>
                <form>
                <input type="text" placeholder="Nombre de usuario" />
                <input type="email" placeholder="Correo electrónico" />
                <select>
                    <option value="admin">Administrador</option>
                    <option value="coordinador">Coordinador</option>
                </select>
                <button type="submit">Agregar</button>
                </form>
                <button className="close-modal-btn" onClick={toggleModal}>Cerrar</button>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Registro;