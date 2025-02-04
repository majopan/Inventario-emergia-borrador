import React from "react";


const Terraza3Section = () => {
    // TerrazaSection Component
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

export default Terraza3Section;