import React from 'react';
import SidebarMenu from './SidebarMenu'; // Asegúrate de importar correctamente el componente SidebarMenu
import '../styles/Dashboard.css'; // Asegúrate de personalizar este archivo CSS según tus necesidades

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      {/* El Sidebar ocupa toda la altura de la pantalla */}
      <SidebarMenu />
      
      {/* El contenido no está presente aquí */}
      <div className="dashboard-content" style={{ flex: 1 }}></div>
    </div>
  );
};

export default Dashboard;
