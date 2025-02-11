import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SidebarMenu from './components/SidebarMenu'; // Importa SidebarMenu

// Nuevas páginas
import Login from "./pages/login";
import Dashboard from './pages/Dashboard';

import Settings from './pages/Settings'; // No agregar la extensión .js
import Plans from './pages/Plans';
import Records from './pages/Records';
import History from './pages/History';
import Services from './pages/services';
import Sedes from './pages/sedes';
import Devices from './pages/Devices'; // Elimina .js

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
          path="/services"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Services />
            </div>
          }
        />
        <Route
          path="/sedes"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Sedes />
            </div>
          }
        />
        <Route
          path="/registro"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <Records />
            </div>
          }
        />
        <Route
          path="/historial"
          element={
            <div style={{ display: "flex" }}>
              <SidebarMenu />
              <History />
            </div>
          }
        />
        <Route
          path="/dispositivos"
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