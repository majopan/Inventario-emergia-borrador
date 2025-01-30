import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import DashboardContent from '../components/Dashboardcard';
import Grafica from '../components/Grafica';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SidebarMenu />
      <DashboardContent />
      <Grafica />
    </div>
  );
};

export default Dashboard;