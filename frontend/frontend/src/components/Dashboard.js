    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import '../styles/Dashboard.css'; // Asegúrate de personalizar este archivo CSS según tus necesidades

    const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes limpiar tokens o realizar cualquier otra lógica necesaria al cerrar sesión
        alert('Has cerrado sesión correctamente.');
        navigate('/'); // Redirigir al login
    };

    return (
        <div className="dashboard-container">
        <header className="dashboard-header">
            <h1 className="dashboard-title">E-Inventory Dashboard</h1>
            <nav className="dashboard-nav">
            <ul className="nav-links">
                <li>
                <button className="nav-button" onClick={() => navigate('/profile')}>Perfil</button>
                </li>
                <li>
                <button className="nav-button" onClick={() => navigate('/inventory')}>Inventario</button>
                </li>
                <li>
                <button className="nav-button" onClick={() => navigate('/settings')}>Configuración</button>
                </li>
                <li>
                <button className="nav-button logout-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
                </li>
            </ul>
            </nav>
        </header>
        <main className="dashboard-main">
            <section className="welcome-section">
            <h2>¡Bienvenido al sistema de inventario!</h2>
            <p>Selecciona una opción del menú para comenzar a gestionar tu inventario.</p>
            </section>
            <section className="stats-section">
            <div className="stats-card">
                <h3>Productos totales</h3>
                <p>120</p>
            </div>
            <div className="stats-card">
                <h3>Ventas recientes</h3>
                <p>35</p>
            </div>
            <div className="stats-card">
                <h3>Usuarios activos</h3>
                <p>8</p>
            </div>
            </section>
        </main>
        <footer className="dashboard-footer">
            <p>&copy; {new Date().getFullYear()} E-Inventory. Todos los derechos reservados.</p>
        </footer>
        </div>
    );
    };

    export default Dashboard;
