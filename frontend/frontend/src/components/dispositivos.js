import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Devices.css';

const Dispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [newDevice, setNewDevice] = useState({
    tipo: "CPU",
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
    regimen: "",
    placa_cu: "",
  });
  const [editingDevice, setEditingDevice] = useState(null);

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
      setNewDevice({
        tipo: "CPU",
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
        regimen: "",
        placa_cu: "",
      });
    } catch (error) {
      console.error("Error al agregar el dispositivo:", error);
    }
  };

  // Actualizar un dispositivo
  const updateDevice = async (deviceId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/dispositivos/${deviceId}/`, editingDevice);
      fetchDispositivos();
      setEditingDevice(null);
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

  return (
    <div>
      <h2>Gestión de Dispositivos</h2>

      {/* Formulario para agregar un dispositivo */}
      <div>
        <h3>Agregar Dispositivo</h3>
        <input
          type="text"
          placeholder="Modelo"
          value={newDevice.modelo}
          onChange={(e) => setNewDevice({ ...newDevice, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Serial"
          value={newDevice.serial}
          onChange={(e) => setNewDevice({ ...newDevice, serial: e.target.value })}
        />
        <input
          type="text"
          placeholder="Razon Social"
          value={newDevice.razon_social}
          onChange={(e) => setNewDevice({ ...newDevice, razon_social: e.target.value })}
        />
        <input
          type="text"
          placeholder="Regimen"
          value={newDevice.regimen}
          onChange={(e) => setNewDevice({ ...newDevice, regimen: e.target.value })}
        />
        <input
          type="text"
          placeholder="Placa CU"
          value={newDevice.placa_cu}
          onChange={(e) => setNewDevice({ ...newDevice, placa_cu: e.target.value })}
        />
        <button onClick={addDevice}>Agregar</button>
      </div>

      {/* Lista de dispositivos */}
      <h3>Dispositivos Existentes</h3>
      <ul>
        {dispositivos.map((device) => (
          <li key={device.id}>
            {device.tipo} - {device.marca} {device.modelo} (Serial: {device.serial})
            <button onClick={() => setEditingDevice(device)}>Editar</button>
            <button onClick={() => deleteDevice(device.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para editar un dispositivo */}
      {editingDevice && (
        <div>
          <h3>Editar Dispositivo</h3>
          <input
            type="text"
            placeholder="Modelo"
            value={editingDevice.modelo}
            onChange={(e) => setEditingDevice({ ...editingDevice, modelo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Serial"
            value={editingDevice.serial}
            onChange={(e) => setEditingDevice({ ...editingDevice, serial: e.target.value })}
          />
          <input
            type="text"
            placeholder="Razon Social"
            value={editingDevice.razon_social}
            onChange={(e) => setEditingDevice({ ...editingDevice, razon_social: e.target.value })}
          />
          <input
            type="text"
            placeholder="Regimen"
            value={editingDevice.regimen}
            onChange={(e) => setEditingDevice({ ...editingDevice, regimen: e.target.value })}
          />
          <input
            type="text"
            placeholder="Placa CU"
            value={editingDevice.placa_cu}
            onChange={(e) => setEditingDevice({ ...editingDevice, placa_cu: e.target.value })}
          />
          <button onClick={() => updateDevice(editingDevice.id)}>Guardar cambios</button>
        </div>
      )}
    </div>
  );
};

export default Dispositivos;
