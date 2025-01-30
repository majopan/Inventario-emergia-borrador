import React from 'react';
import { FaHome, FaCogs, FaPowerOff } from 'react-icons/fa';
import { MdInventory, MdHistory } from 'react-icons/md';
import { BsDiagram3 } from 'react-icons/bs';
import { AiOutlineFileText } from 'react-icons/ai';
import { IoIosDesktop } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom'; // Usamos useLocation para verificar la ruta activa
import '../styles/SidebarMenu.css';

const SidebarMenu = () => {
  const location = useLocation(); // Obtener la ruta actual

  // Función para agregar la clase "active" si la ruta es la misma
  const isActive = (path) => location.pathname === path ? 'menu-item active' : 'menu-item';

  return (
    <div className="sidebar">
      <Link to="/dashboard" className={isActive('/dashboard')}>
        <FaHome size={20} />
        <span>Inicio</span>
      </Link>
      <Link to="/inventory" className={isActive('/inventory')}>
        <MdInventory size={20} />
        <span>Inventario</span>
      </Link>
      <Link to="/planos" className={isActive('/plans')}>
        <BsDiagram3 size={20} />
        <span>Planos</span>
      </Link>
      <Link to="/records" className={isActive('/records')}>
        <AiOutlineFileText size={20} />
        <span>Registros</span>
      </Link>
      <Link to="/history" className={isActive('/history')}>
        <MdHistory size={20} />
        <span>Historial</span>
      </Link>
      <Link to="/devices" className={isActive('/devices')}>
        <IoIosDesktop size={20} />
        <span>Dispositivos</span>
      </Link>
      <Link to="/settings" className={isActive('/settings')}>
        <FaCogs size={20} />
        <span>Config</span>
      </Link>
      <div className="divider" />
      <Link to="/" className="menu-item">
        <FaPowerOff size={20} />
      </Link>
    </div>
  );
};

export default SidebarMenu;
