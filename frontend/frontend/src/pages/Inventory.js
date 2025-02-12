import React from 'react';
import '../styles/Inventory.css'; 
import Inventario from '../components/inventario';// Asegúrate de personalizar este archivo CSS según tus necesidades

const Inventory = () => {
  return (
    <div className="inventory-container">
      <div className="inventory-content">
        <h2>Inventario</h2>
        <p>Contenido relacionado con el inventario.</p>
        <div className="registro-content">
        <Inventario/>
      </div>
      </div>
    </div>
  );
};

export default Inventory;