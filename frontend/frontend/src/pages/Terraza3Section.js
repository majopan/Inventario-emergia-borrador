import React from "react";
import terraza3Data from "./terraza3_data.json"; // Importa el JSON

const Terraza3Section = () => {
  return (
    <div className="terraza-container">
      {/* Header */}
      <div className="terraza-header">{terraza3Data.header}</div>

      {/* Top row of numbers */}
      <div className="top-numbers">
        {terraza3Data.topNumbers.map((num) => (
          <div
            key={num.number}
            className="number-cell"
            style={{ left: num.x, top: num.y }}
          >
            {num.number}
          </div>
        ))}
      </div>

      {/* Employee sections */}
      <div className="employee-sections">
        {terraza3Data.employees.map((employee, index) => (
          <EmployeeSection
            key={index}
            name={employee.name}
            redNumbers={employee.redNumbers}
            orangeNumbers={employee.orangeNumbers}
          />
        ))}
      </div>

      {/* Bottom reference */}
      <div className="bottom-reference">{terraza3Data.bottomReference}</div>

      {/* Bottom numbers */}
      <div className="bottom-numbers">
        {terraza3Data.bottomNumbers.map((num) => (
          <div
            key={num.number}
            className="number-cell"
            style={{ left: num.x, top: num.y }}
          >
            {num.number}
          </div>
        ))}
      </div>
    </div>
  );
};

// EmployeeSection Component
function EmployeeSection({ name, redNumbers, orangeNumbers }) {
  return (
    <div className="employee-section">
      <div className="red-numbers">
        {redNumbers.map((num) => (
          <div
            key={num.number}
            className="red-number"
            style={{ left: num.x, top: num.y }}
          >
            {num.number}
          </div>
        ))}
      </div>
      <span className="employee-name">{name}</span>
      <div className="orange-numbers">
        {orangeNumbers.flat().map((num) => (
          <div
            key={num.number}
            className="orange-number"
            style={{ left: num.x, top: num.y }}
          >
            {num.number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terraza3Section;