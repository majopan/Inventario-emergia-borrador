import React, { useState, useEffect } from "react";
import "./Plans.css";
import "./terraza2-section.css";
import Terraza1Section from "./Terraza1Section";
import Terraza2Section from "./Terraza2Section";
import Terraza3Section from "./Terraza3Section";
import Modal from "../components/Modal"; // Importa el componente Modal

const Plans = () => {
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [planData, setPlanData] = useState([]);

  // Obtén los datos desde la API o archivo JSON
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posiciones/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setPlanData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleZoom = (event, factor) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    setTransformOrigin(`${originX}% ${originY}%`);

    setScale((prev) => Math.min(Math.max(prev * factor, 0.5), 2));
  };

  const resetZoom = () => {
    setScale(1);
    setTransformOrigin("center center");
  };

  const handleCellClick = (cell) => {
    setSelectedCell(cell);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCell(null);
  };

  return (
    <div className="dashboard-container">
      <div className="zoom-controls">
        <button onClick={(e) => handleZoom(e, 1.1)}>🔍 Zoom In</button>
        <button onClick={(e) => handleZoom(e, 0.9)}>🔍 Zoom Out</button>
        <button onClick={resetZoom}>🔄 Reset</button>
      </div>

      <div className="plans-content">
        <div className="floor-plan-wrapper">
          <div
            className="floor-plan-container"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: transformOrigin,
            }}
          >
            <div className="left-section">
              {/* Cafeteria */}
              <div className="cafeteria">
                <span>Cafeteria</span>
              </div>

              {/* Celdas dinámicas */}
              <div className="training-room">
                <div className="training-cells">
                  {planData.map((cell) => (
                    <div
                      key={cell.id}
                      className={`cell ${cell.color}`}
                      style={{
                        position: "absolute",
                        left: `${cell.posicion_x}px`,
                        top: `${cell.posicion_y}px`,
                      }}
                      onClick={() => handleCellClick(cell)}
                    >
                      {cell.id_espacio}
                    </div>
                  ))}
                </div>
                <div className="training-label">
                  Sala Capacitaciones
                  <br />
                  formacion
                </div>
              </div>
            </div>

            {/* Otras secciones */}
            <Terraza3Section />
            <Terraza2Section />
            <Terraza1Section />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} cell={selectedCell} />
    </div>
  );
};

export default Plans;
