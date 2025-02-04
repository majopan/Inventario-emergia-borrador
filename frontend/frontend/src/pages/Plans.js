import React, { useState } from "react";
import "./Plans.css";
import "./terraza2-section.css"; // Importamos los estilos de Terraza2Section
import Terraza1Section from "./Terraza1Section";
import Terraza2Section from "./Terraza2Section"; // Importamos Terraza2Section
import Terraza3Section from "./Terraza3Section"; // Importamos Terraza2Section

const Plans = () => {
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleZoom = (event, factor) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calcular el nuevo origen de la transformación
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    setTransformOrigin(`${originX}% ${originY}%`);

    // Aplicar el zoom
    setScale((prev) => {
      const newScale = prev * factor;
      return Math.min(Math.max(newScale, 0.5), 2); // Límites de zoom
    });
  };

  const resetZoom = () => {
    setScale(1);
    setTransformOrigin("center center");
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
            {/* Left Section */}
            <div className="left-section">
              <div className="cafeteria">
                <span>Cafeteria</span>
              </div>

              <div className="training-room">
                <div className="training-cells">
                  <div className="cell yellow">E001</div>
                  <div className="cell yellow">E002</div>
                </div>
                <div className="training-label">
                  Sala Capacitaciones
                  <br />
                  formacion
                </div>
              </div>

              <div className="bottom-cells">
                <div className="row">
                  <div className="cell">E003</div>
                  <div className="cell">E004</div>
                  <div className="cell">E005</div>
                  <div className="cell red-mark">E006</div>
                </div>
                <div className="row">
                  <div className="cell"> </div>
                  <div className="cell"> </div>
                  <div className="cell"> </div>
                  <div className="cell"> </div>
                </div>
                <div className="row">
                  <div className="cell">E007</div>
                  <div className="cell red-dot">E008</div>
                  <div className="cell orange">E009</div>
                  <div className="cell">E010</div>
                </div>
              </div>
            </div>
            {/* Center Section - Reemplazada por TerrazaSection */}
            <Terraza3Section />
            {/* Right Section - Reemplazada por Terraza2Section */}
            <Terraza2Section />
            <Terraza1Section />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Plans;