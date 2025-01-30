import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from './components/Dashboard';
import SidebarMenu from './components/SidebarMenu'; // Importa SidebarMenu

// Nuevas páginas
import Inventory from './components/Inventory';
import Settings from './components/Settings'; // No agregar la extensión .js
import Plans from './components/Plans';
import Records from './components/Records';
import History from './components/History';
import Devices from './components/Devices'; // Elimina .js

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rutas privadas con SidebarMenu */}
        <Route
          path="/dashboard"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu /> {/* Sidebar visible en Dashboard */}
              <Dashboard />   {/* El contenido principal */}
            </div>
          }
        />
        <Route
          path="/inventory"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Inventory />
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Settings />
            </div>
          }
        />
        <Route
          path="/planos"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Plans />
            </div>
          }
        />
        <Route
          path="/records"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Records />
            </div>
          }
        />
        <Route
          path="/history"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <History />
            </div>
          }
        />
        <Route
          path="/devices"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Devices />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
