    import React from "react";
    import "../styles/terraza2-section.css"; // Importamos los estilos de Terraza2Section


    // Terraza2Section Component
    const Terraza2Section = () => {
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
    
    export default Terraza2Section;