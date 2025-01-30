    import React from 'react';
    import '../styles/Dashboard.css';

    const DashboardContent = () => {
    return (
        <div className="dashboard-content">
        <div className="dashboard-image-container">
            <img
            src={require('../assets/E-Inventory.png')}
            alt="E-Inventory"
            className="dashboard-image"
            />
        </div>

        <div className="cards-container">
            {cardsData.map((card, index) => (
            <div className="card" key={index}>
                <img src={require('../assets/icon.ico')} alt="icon" className="card-icon" />
                <h5>{card.title}</h5>
                <h1>{card.value}</h1>
                <p>{card.date}</p>
            </div>
            ))}
        </div>
        </div>
    );
    };

    const cardsData = [
    { title: 'Total dispositivos', value: '5.254', date: 'April 2028' },
    { title: 'Dispositivos en uso', value: '1.234', date: 'April 2028' },
    { title: 'Dispositivos disponibles', value: '3.504', date: 'April 2028' },
    ];

    export default DashboardContent;