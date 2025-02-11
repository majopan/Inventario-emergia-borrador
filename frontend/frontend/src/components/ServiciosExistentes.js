import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaServicestack, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import "../styles/ServiciosExistentes.css";

const ServiciosExistentes = () => {
  const [services, setServices] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    nombre: "",
    codigo_analitico: "",
    sede: "",
  });

  // Fetch the list of services
  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/servicios/");
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setServices([]);
    }
  }, []);

  // Fetch the list of sedes
  const fetchSedes = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/sedes/");
      setSedes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener sedes:", error);
    }
  }, []);

  // Fetch service details
  const fetchServiceDetails = async (serviceId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/servicios/${serviceId}/`);
      setSelectedService(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles del servicio:", error);
    }
  };

  // Edit service
  const editService = async (serviceId, updatedServiceData) => {
    try {
      if (!updatedServiceData.nombre) {
        console.error("El campo 'nombre' es obligatorio.");
        return;
      }

      await axios.put(`http://127.0.0.1:8000/api/servicios/${serviceId}/`, updatedServiceData);
      console.log("Servicio editado exitosamente.");
      fetchServices();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error al editar el servicio:", error);
    }
  };

  // Delete service
  const deleteService = async (serviceId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/servicios/${serviceId}/`);
      console.log("Servicio eliminado exitosamente.");
      fetchServices();
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  // Add new service
  const addService = async () => {
    if (!newService.nombre) {
      console.error("El campo 'nombre' es obligatorio.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/servicios/", newService);
      console.log("Servicio agregado exitosamente.");
      setShowForm(false);
      fetchServices();
    } catch (error) {
      console.error("Error al agregar el servicio:", error);
    }
  };

  // Load services and sedes when component mounts
  useEffect(() => {
    fetchServices();
    fetchSedes();
  }, [fetchServices, fetchSedes]);

  return (
    <div className="records-container">
      <div className="user-card">
        <div className="card-header">
          <h2>Servicios existentes</h2>
          <button className="add-user-btn" onClick={() => setShowForm(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="user-list">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="user-item">
                <div className="user-avatar">
                  <FaServicestack />
                </div>
                <div className="user-info" onClick={() => fetchServiceDetails(service.id)}>
                  <div className="user-name">{service.nombre}</div>
                  <div className="user-access">Sede: {service.sede || "No asignada"}</div>
                </div>
                <div className="user-actions">
                  <button className="action-button edit" onClick={() => fetchServiceDetails(service.id)}>
                    <FaEdit />
                  </button>
                  <button className="action-button delete" onClick={() => deleteService(service.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay servicios disponibles.</p>
          )}
        </div>

        {/* Modal for viewing and editing service details */}
        {showDetailModal && selectedService && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowDetailModal(false)}>
                &times;
              </button>
              <div className="modal-content">
                <h1>Detalles del servicio</h1>
                <div className="input-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={selectedService.nombre || ""}
                    onChange={(e) => setSelectedService({ ...selectedService, nombre: e.target.value })}
                    placeholder="Nombre"
                  />
                </div>
                <div className="input-group">
                  <label>Código analítico</label>
                  <input
                    type="text"
                    value={selectedService.codigo_analitico || ""}
                    onChange={(e) => setSelectedService({ ...selectedService, codigo_analitico: e.target.value })}
                    placeholder="Código analítico"
                  />
                </div>
                <div className="input-group">
                  <label>Sede</label>
                  <select
                    value={selectedService.sede || ""}
                    onChange={(e) => setSelectedService({ ...selectedService, sede: e.target.value })}
                  >
                    <option value="">Seleccionar sede</option>
                    {sedes.map((sede) => (
                      <option key={sede.id} value={sede.id}>
                        {sede.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="create-button" onClick={() => editService(selectedService.id, selectedService)}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for adding new service */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setShowForm(false)}>
                &times;
              </button>
              <div className="modal-content">
                <h1>Agregar Servicio</h1>
                <div className="input-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre del servicio"
                    value={newService.nombre}
                    onChange={(e) => setNewService({ ...newService, nombre: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Código analítico</label>
                  <input
                    type="text"
                    placeholder="Código analítico"
                    value={newService.codigo_analitico}
                    onChange={(e) => setNewService({ ...newService, codigo_analitico: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Sede</label>
                  <select
                    value={newService.sede || ""}
                    onChange={(e) => setNewService({ ...newService, sede: e.target.value })}
                  >
                    <option value="">Seleccionar sede</option>
                    {sedes.map((sede) => (
                      <option key={sede.id} value={sede.id}>
                        {sede.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="create-button" onClick={addService}>
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

export default ServiciosExistentes;
