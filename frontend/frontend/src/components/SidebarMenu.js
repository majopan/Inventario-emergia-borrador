    import styled from "styled-components";
    import { FaHome, FaCogs, FaPowerOff } from "react-icons/fa";
    import { MdInventory, MdHistory } from "react-icons/md";
    import { BsDiagram3 } from "react-icons/bs";
    import { AiOutlineFileText } from "react-icons/ai";
    import { IoIosDesktop } from "react-icons/io";

    const Sidebar = styled.div`
    width: 100px;
    height: 100vh; /* Esto asegura que el sidebar ocupe toda la altura de la pantalla */
    background-color: #2c2f45;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    `;

    const MenuItem = styled.div`
    width: 100%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => (props.active ? "#a48bef" : "#ffffff")};
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
        color: #a48bef;
    }
    `;

    const Divider = styled.div`
    width: 60%;
    height: 1px;
    background-color: #555;
    margin: 10px 0;
    `;

    const SidebarMenu = () => {
    return (
        <Sidebar>
        <MenuItem active>
            <FaHome size={20} />
            <span>Inicio</span>
        </MenuItem>
        <MenuItem>
            <MdInventory size={20} />
            <span>Inventario</span>
        </MenuItem>
        <MenuItem>
            <BsDiagram3 size={20} />
            <span>Planos</span>
        </MenuItem>
        <MenuItem>
            <AiOutlineFileText size={20} />
            <span>Registros</span>
        </MenuItem>
        <MenuItem>
            <MdHistory size={20} />
            <span>Historial</span>
        </MenuItem>
        <MenuItem>
            <IoIosDesktop size={20} />
            <span>Dispositivos</span>
        </MenuItem>
        <MenuItem>
            <FaCogs size={20} />
            <span>Config</span>
        </MenuItem>
        <Divider />
        <MenuItem>
            <FaPowerOff size={20} />
        </MenuItem>
        </Sidebar>
    );
    };

    export default SidebarMenu;
