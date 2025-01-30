import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import DashboardContent from '../components/Dashboardcard';
import Grafica from '../components/Grafica';
import MachineStats from '../components/MachineStats'; // Importa el nuevo componente
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <SidebarMenu />
      <div className="main-container">
        <div className="dashboard-container">
          <DashboardContent />
          <div className="chart-and-stats-container">
            <Grafica />
            <MachineStats />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;