import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaBuilding, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import "../styles/SedesExistentes.css";

const SedesExistentes = () => {
  const [sedes, setSedes] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newSede, setNewSede] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
  });

  // Fetch the list of sedes
  const fetchSedes = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/sedes/");
      setSedes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener sedes:", error);
      setSedes([]);
    }
  }, []);

  // Fetch sede details
  const fetchSedeDetails = async (sedeId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/sedes/${sedeId}/`);
      setSelectedSede(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles de la sede:", error);
    }
  };

  // Edit sede
  const editSede = async (sedeId, updatedSedeData) => {
    try {
      if (!updatedSedeData.nombre) {
        console.error("El campo 'nombre' es obligatorio.");
        return;
      }

      await axios.put(`http://127.0.0.1:8000/api/sedes/${sedeId}/`, updatedSedeData);
      console.log("Sede editada exitosamente.");
      fetchSedes();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error al editar la sede:", error);
    }
  };

  // Delete sede
  const deleteSede = async (sedeId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/sedes/${sedeId}/`);
      console.log("Sede eliminada exitosamente.");
      fetchSedes();
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
    }
  };

  // Add new sede
  const addSede = async () => {
    if (!newSede.nombre) {
      console.error("El campo 'nombre' es obligatorio.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/sedes/", newSede);
      console.log("Sede agregada exitosamente.");
      setShowForm(false);
      fetchSedes();
    } catch (error) {
      console.error("Error al agregar la sede:", error);
    }
  };

  // Load sedes when component mounts
  useEffect(() => {
    fetchSedes();
  }, [fetchSedes]);

  return (
    <div className="records-container">
      <div className="user-card">
        <div className="card-header">
          <h2>Sedes existentes</h2>
          <button className="add-user-btn" onClick={() => setShowForm(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="user-list">
          {sedes.length > 0 ? (
            sedes.map((sede) => (
              <div key={sede.id} className="user-item">
                <div className="user-avatar">
                  <FaBuilding />
                </div>
                <div className="user-info" onClick={() => fetchSedeDetails(sede.id)}>
                  <div className="user-name">{sede.nombre}</div>
                  <div className="user-access">
                    Dirección: {sede.direccion || "No especificada"}
                  </div>
                  <div className="user-access">
                    Ciudad: {sede.ciudad || "No especificada"}
                  </div>
                </div>
                <div className="user-actions">
                  <button className="action-button edit" onClick={() => fetchSedeDetails(sede.id)}>
                    <FaEdit />
                  </button>
                  <button className="action-button delete" onClick={() => deleteSede(sede.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay sedes disponibles.</p>
          )}
        </div>

        {/* Modal for viewing and editing sede details */}
        {showDetailModal && selectedSede && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowDetailModal(false)}>
                &times;
              </button>
              <div className="modal-content">
                <h1>Detalles de la sede</h1>
                <div className="input-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={selectedSede.nombre || ""}
                    onChange={(e) => setSelectedSede({ ...selectedSede, nombre: e.target.value })}
                    placeholder="Nombre"
                  />
                </div>
                <div className="input-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={selectedSede.direccion || ""}
                    onChange={(e) => setSelectedSede({ ...selectedSede, direccion: e.target.value })}
                    placeholder="Dirección"
                  />
                </div>
                <div className="input-group">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    value={selectedSede.ciudad || ""}
                    onChange={(e) => setSelectedSede({ ...selectedSede, ciudad: e.target.value })}
                    placeholder="Ciudad"
                  />
                </div>
                <button className="create-button" onClick={() => editSede(selectedSede.id, selectedSede)}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for adding new sede */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowForm(false)}>
                &times;
              </button>
              <div className="modal-content">
                <h1>Agregar Sede</h1>
                <div className="input-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre de la sede"
                    value={newSede.nombre}
                    onChange={(e) => setNewSede({ ...newSede, nombre: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={newSede.direccion}
                    onChange={(e) => setNewSede({ ...newSede, direccion: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={newSede.ciudad}
                    onChange={(e) => setNewSede({ ...newSede, ciudad: e.target.value })}
                  />
                </div>
                <button className="create-button" onClick={addSede}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SedesExistentes;
