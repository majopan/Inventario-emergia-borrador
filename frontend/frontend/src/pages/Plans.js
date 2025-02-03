import React, { useState } from "react";
import "./Plans.css";
import "./terraza2-section.css"; // Importamos los estilos de Terraza2Section

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
            <TerrazaSection />

            {/* Right Section - Reemplazada por Terraza2Section */}
            <Terraza2Section />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;

// TerrazaSection Component
function TerrazaSection() {
  return (
    <div className="terraza-container">
      {/* Header */}
      <div className="terraza-header">TERRAZA 3</div>

      {/* Main content */}
      <div className="terraza-content">
        {/* Top row of numbers */}
        <div className="top-numbers">
          {["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011"].map((num) => (
            <div key={num} className="number-cell">
              {num}
            </div>
          ))}
        </div>

        {/* Employee sections */}
        <div className="employee-sections">
          {/* Manuela O */}
          <EmployeeSection
            name="Manuela O"
            redNumbers={["0089", "0090", "0091", "0092"]}
            orangeNumbers={[
              ["001", "0012", "0013", "0014", "0015", "0016", "0017", "0018"],
              ["002", "0019", "0020", "0021", "0022", "0023", "0024", "0025"],
            ]}
          />

          {/* Jose David */}
          <EmployeeSection
            name="Jose David"
            redNumbers={["0093", "0094", "0095", "0096"]}
            orangeNumbers={[
              ["003", "0026", "0027", "0028", "0029", "0030", "0031", "0032"],
              ["004", "0033", "0034", "0035", "0036", "0037", "0038", "0039"],
            ]}
          />

          {/* Leonardo */}
          <EmployeeSection
            name="Leonardo"
            redNumbers={["0097", "0098", "0099", "0100"]}
            orangeNumbers={[
              ["005", "0040", "0041", "0042", "0043", "0044", "0045", "0046"],
              ["006", "0047", "0048", "0049", "0050", "0051", "0052", "0053"],
            ]}
          />

          {/* GTR */}
          <EmployeeSection
            name="GTR"
            redNumbers={["0101", "0102", "0103", "0104"]}
            orangeNumbers={[
              ["007", "0054", "0055", "0056", "0057", "0058", "0059", "0060"],
              ["008", "0061", "0062", "0063", "0064", "0065", "0066", "0067"],
            ]}
          />

          {/* Last row */}
          <EmployeeSection
            name=""
            redNumbers={["0105"]}
            orangeNumbers={[
              ["009", "0068", "0069", "0070", "0071", "0072", "0073", "0074"],
              ["010", "0075", "0076", "0077", "0078", "0079", "0080", "0081"],
            ]}
          />
        </div>

        {/* Bottom reference */}
        <div className="bottom-reference">186020_DAVIVIENDA_TELEVENTAS</div>

        {/* Bottom numbers */}
        <div className="bottom-numbers">
          {["0082", "0083", "0084", "0085", "0086", "0087", "0088"].map((num) => (
            <div key={num} className="number-cell">
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EmployeeSection Component
function EmployeeSection({ name, redNumbers, orangeNumbers }) {
  return (
    <div className="employee-section">
      <div className="red-numbers">
        {redNumbers.map((num) => (
          <div key={num} className="red-number">
            {num}
          </div>
        ))}
      </div>
      <span className="employee-name">{name}</span>
      <div className="orange-numbers">
        {orangeNumbers.flat().map((num) => (
          <div key={num} className="orange-number">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

// Terraza2Section Component
function Terraza2Section() {
  return (
    <div className="terraza2-container">
      {/* Header */}

      {/* Main content */}
      <div className="terraza2-content">
        <div className="terraza2-title">TERRAZA 2</div>

        {/* Top section */}
        <div className="top-section">
          {/* Left E-numbers */}
          <div className="left-e-numbers">
            <div className="e-row">
              <div className="e-cell">E018</div>
              <div className="e-cell">E019</div>
              <div className="e-cell">E020</div>
              <div className="e-cell">E021</div>
              <div className="e-cell">E022</div>
            </div>
            <div className="e-single">E017</div>
            <div className="e-single">E016</div>
            <div className="e-single">E014</div>
          </div>

          {/* Center section */}
          <div className="center-section">
            <div className="ti-label">TI</div>
          </div>

          {/* Right section */}
          <div className="right-section">
            <div className="e-row">
              <div className="e-cell">E023</div>
              <div className="e-cell">E024</div>
            </div>
            <div className="e-row mt-2">
              <div className="e-cell">E025</div>
              <div className="e-cell">E026</div>
            </div>
            <div className="datacenter-label">Data Center</div>
          </div>
        </div>

        {/* Employee grid section */}
        <div className="employee-grid">
          <EmployeeRow
            leftNums={["0169"]}
            name="Andrea TL"
            orangeNum="011"
            greenNums={["0106", "0107", "0108", "0109", "0110", "0111", "0112"]}
          />
          <EmployeeRow
            leftNums={["0170"]}
            orangeNum="012"
            greenNums={["0113", "0114", "0115", "0116", "0117", "0118", "0119"]}
          />
          <EmployeeRow
            leftNums={["0171", "0172", "0173"]}
            name="Alejo TL"
            orangeNum="013"
            greenNums={["0120", "0121", "0122", "0123", "0124", "0125", "0126"]}
          />
          <EmployeeRow
            name="Baron TL"
            orangeNum="014"
            greenNums={["0127", "0128", "0129", "0130", "0131", "0132", "0133"]}
          />
          <EmployeeRow
            leftNums={["0174", "0175", "0176"]}
            name="Kelly GO"
            orangeNum="015"
            greenNums={["0134", "0135", "0136", "0137", "0138", "0139", "0140"]}
          />
          <EmployeeRow
            leftNums={["0177", "0178"]}
            name="Nata CX"
            orangeNum="016"
            greenNums={["0141", "0142", "0143", "0144", "0145", "0146", "0147"]}
          />
          <EmployeeRow
            leftNums={["0179", "0180", "0181"]}
            name="ALEJA RENA 4SA O 4ISA A"
            orangeNum="017"
            greenNums={["0148", "0149", "0150", "0151", "0152", "0153", "0154"]}
          />
          <EmployeeRow
            name="Puesher"
            orangeNum="018"
            greenNums={["0155", "0156", "0157", "0158", "0159", "0160", "0161"]}
          />
        </div>

        {/* Bottom names */}
        <div className="bottom-names">
          <div className="name-left">Paola</div>
          <div className="name-right">Fabian</div>
        </div>

        {/* Bottom numbers */}
        <div className="bottom-numbers">
          {["0162", "0163", "0164", "0165", "0166", "0167", "0168"].map((num) => (
            <div key={num} className="number-cell-terraza2">
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EmployeeRow Component
function EmployeeRow({ leftNums = [], name = "", orangeNum, greenNums = [] }) {
  return (
    <div className="employee-row">
      <div className="left-numbers">
        {leftNums.map((num) => (
          <div key={num} className="left-number">
            {num}
          </div>
        ))}
      </div>
      {name && <div className="employee-name">{name}</div>}
      <div className="number-group">
        <div className="orange-number">{orangeNum}</div>
        <div className="green-numbers-terraza2">
          {greenNums.map((num) => (
            <div key={num} className="green-number-terraza2">
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}