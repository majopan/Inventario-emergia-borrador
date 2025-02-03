import React, { useState } from "react";
import "./Plans.css";

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

            {/* Center Section */}
            <div className="center-section">
              <div className="header">TERRAZA 3</div>

              <div className="red-row">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="cell red">
                    {String(i + 1).padStart(4, "0")}
                  </div>
                ))}
              </div>

              <div className="person-sections">
                {[
                  { name: "Manuela G", startNum: 12, rows: 2 },
                  { name: "Jose David", startNum: 26, rows: 2 },
                  { name: "Leonardo", startNum: 40, rows: 2 },
                  { name: "GTR", startNum: 54, rows: 2 },
                ].map((person, idx) => (
                  <div key={person.name} className="person-section">
                    <div className="name">{person.name}</div>
                    <div className="grid">
                      {Array.from({ length: person.rows * 11 }).map((_, i) => (
                        <div key={i} className="cell orange">
                          {String(person.startNum + i).padStart(4, "0")}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="televentas">
                <div className="label">VIVIENDA_TELEVENTAS</div>
                <div className="grid">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="cell orange">
                      {String(82 + i).padStart(4, "0")}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="right-section">
              <div className="header">TERRAZA 2</div>

              <div className="numbered-cells">
                {["5018", "5019", "5020", "5021", "5022", "5023", "5024", "5025", "5026"].map((num) => (
                  <div key={num} className="cell">
                    {num}
                  </div>
                ))}
              </div>

              <div className="data-center">
                <span>Data Center</span>
                <div className="boxes">
                  <div className="box"></div>
                  <div className="box"></div>
                </div>
              </div>

              <div className="green-sections">
                {[
                  { name: "Andrea TI", startNum: 106, count: 14 },
                  { name: "Alejo TI", startNum: 120, count: 14 },
                  { name: "Kelly GC", startNum: 134, count: 14 },
                  { name: "ALEJARENAGA4SA OFISA A", startNum: 148, count: 14 },
                ].map((section) => (
                  <div key={section.name} className="green-section">
                    <div className="name">{section.name}</div>
                    <div className="grid">
                      {Array.from({ length: section.count }).map((_, i) => (
                        <div key={i} className="cell green">
                          {String(section.startNum + i).padStart(4, "0")}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;