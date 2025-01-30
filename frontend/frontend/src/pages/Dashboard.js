import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import DashboardContent from '../components/Dashboardcard';
import Grafica from '../components/Grafica';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <SidebarMenu />
      <div className="main-container">
        <div className="dashboard-container">
          <DashboardContent />
          <Grafica />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
