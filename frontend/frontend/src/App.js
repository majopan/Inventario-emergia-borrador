import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SidebarMenu from './components/SidebarMenu'; // Importa SidebarMenu

// Nuevas páginas
import Login from "./pages/login";
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventory';
import Settings from './pages/Settings';
import Plans from './pages/Plans';
import Records from './pages/Records';
import History from './pages/History';
import Services from './pages/services';
import Sedes from './pages/sedes';
import Devices from './pages/Devices';

// Componente de envoltura para rutas privadas
const PrivateRoute = () => {
  return (
    <div style={{ display: "flex" }}>
      <SidebarMenu /> {/* Sidebar visible en todas las rutas privadas */}
      <Outlet /> {/* Renderiza el contenido principal de la ruta */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/registro" element={<Records />} />
          <Route path="/historial" element={<History />} />
          <Route path="/dispositivos" element={<Devices />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;