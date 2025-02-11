import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash, FaDesktop, FaTabletAlt, FaMobileAlt, FaServer, FaArchive, FaLaptop } from "react-icons/fa";
import "../styles/Devices.css";

const Dispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newDevice, setNewDevice] = useState(initialDeviceState());
  const [selectedDevice, setSelectedDevice] = useState(null);

  function initialDeviceState() {
    return {
      tipo: "COMPUTADOR",
      marca: "DELL",
      modelo: "",
      serial: "",
      estado: "BUENO",
      capacidad_memoria_ram: "8GB",
      capacidad_disco_duro: "500GB",
      tipo_disco_duro: "HDD",
      tipo_memoria_ram: "DDR4",
      ubicacion: "SEDE",
      razon_social: "",
      regimen: "ECCC",
      placa_cu: "",
    };
  }

  // Obtener la lista de dispositivos
  const fetchDispositivos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dispositivos/");
      setDispositivos(response.data);
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
    }
  };

  // Crear un nuevo dispositivo
  const addDevice = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/dispositivos/", newDevice);
      fetchDispositivos();
      setShowForm(false);
      setNewDevice(initialDeviceState());
    } catch (error) {
      console.error("Error al agregar el dispositivo:", error);
    }
  };

  // Actualizar un dispositivo
  const updateDevice = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/dispositivos/${selectedDevice.id}/`, selectedDevice);
      fetchDispositivos();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error al actualizar el dispositivo:", error);
    }
  };

  // Eliminar un dispositivo
  const deleteDevice = async (deviceId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dispositivos/${deviceId}/`);
      fetchDispositivos();
    } catch (error) {
      console.error("Error al eliminar el dispositivo:", error);
    }
  };

  useEffect(() => {
    fetchDispositivos();
  }, []);

  // Función para obtener el icono según el tipo de dispositivo
  const getDeviceIcon = (tipo) => {
    switch (tipo) {
      case "COMPUTADOR":
        return <FaLaptop />;
      case "DESKTOP":
        return <FaArchive />;
      case "MONITOR":
        return <FaDesktop />;
      case "TABLET":
        return <FaTabletAlt />;
      case "MOVIL":
        return <FaMobileAlt />;
      default:
        return <FaServer />;
    }
  };

  return (
    <div className="records-container">
      <div className="user-card">
        <div className="card-header">
          <h2>Gestión de Dispositivos</h2>
          <button className="add-user-btn" onClick={() => setShowForm(true)}>
            <FaPlus />
          </button>
        </div>

        {/* Lista de dispositivos */}
        <div className="user-list">
          {dispositivos.length > 0 ? (
            dispositivos.map((device) => (
              <div key={device.id} className="user-item">
                <div className="user-avatar">{getDeviceIcon(device.tipo)}</div>
                <div className="user-info" onClick={() => {
                  setSelectedDevice(device);
                  setShowDetailModal(true);
                }}>
                  <div className="user-name">{device.tipo} - {device.marca} {device.modelo}</div>
                  <div className="user-access">Serial: {device.serial}</div>
                </div>
                <div className="user-actions">
                  <button className="action-button edit" onClick={() => {
                    setSelectedDevice(device);
                    setShowDetailModal(true);
                  }}>
                    <FaEdit />
                  </button>
                  <button className="action-button delete" onClick={() => deleteDevice(device.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay dispositivos disponibles.</p>
          )}
        </div>

        {/* Modal para agregar dispositivo */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowForm(false)}>
                &times;
              </button>
              <DeviceForm device={newDevice} setDevice={setNewDevice} onSubmit={addDevice} />
            </div>
          </div>
        )}

        {/* Modal para editar dispositivo */}
        {showDetailModal && selectedDevice && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowDetailModal(false)}>
                &times;
              </button>
              <DeviceForm device={selectedDevice} setDevice={setSelectedDevice} onSubmit={updateDevice} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DeviceForm = ({ device, setDevice, onSubmit }) => (
  <div className="modal-content">
    <h1>{device.id ? "Editar Dispositivo" : "Agregar Dispositivo"}</h1>
    {renderInput("Modelo", "modelo", device, setDevice)}
    {renderInput("Serial", "serial", device, setDevice)}
    {renderSelect("Tipo", "tipo", device, setDevice, [
      { value: "COMPUTADOR", label: "Computador" },
      { value: "DESKTOP", label: "Desktop" },
      { value: "MONITOR", label: "Monitor" },
      { value: "TABLET", label: "Tablet" },
      { value: "MOVIL", label: "Celular" },
    ])}
    {renderSelect("Marca", "marca", device, setDevice, [
      { value: "DELL", label: "Dell" },
      { value: "HP", label: "HP" },
      { value: "LENOVO", label: "Lenovo" },
      { value: "APPLE", label: "Apple" },
      { value: "SAMSUNG", label: "Samsung" },
    ])}
    {renderSelect("Estado", "estado", device, setDevice, [
      { value: "REPARAR", label: "En reparación" },
      { value: "BUENO", label: "Buen estado" },
      { value: "MALO", label: "Mal estado" },
    ])}
    {renderInput("Razón Social", "razon_social", device, setDevice)}
    <button className="create-button" onClick={onSubmit}>
      {device.id ? "Guardar cambios" : "Agregar"}
    </button>
  </div>
);

const renderInput = (label, field, device, setDevice) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type="text"
      value={device[field] || ""}
      onChange={(e) => setDevice({ ...device, [field]: e.target.value })}
      placeholder={label}
    />
  </div>
);

const renderSelect = (label, field, device, setDevice, options) => (
  <div className="input-group">
    <label>{label}</label>
    <select
      value={device[field] || ""}
      onChange={(e) => setDevice({ ...device, [field]: e.target.value })}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dispositivos;
