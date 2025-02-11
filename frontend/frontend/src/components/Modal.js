    import React from "react";

    const Modal = ({ isOpen, onClose, cell }) => {
    if (!isOpen || !cell) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Información del espacio</h2>
            <p><strong>ID:</strong> {cell.id}</p>
            <p><strong>Piso:</strong> {cell.piso}</p>
            <p><strong>Nombre:</strong> {cell.nombre}</p>
            <p><strong>Descripción:</strong> {cell.descripcion}</p>
            <p><strong>Estado:</strong> {cell.status}</p>
            <p><strong>Color:</strong> {cell.color}</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
        </div>
    );
    };

    export default Modal;