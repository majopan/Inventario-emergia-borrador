"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Search, Trash2, FileText } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import * as XLSX from "xlsx"
import '../styles/Inventario.css';
const Inventario = () => {
  const [dispositivos, setDispositivos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", sede: "" })

  useEffect(() => {
    fetchDispositivos()
  }, [])

  const fetchDispositivos = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://127.0.0.1:8000/api/dispositivos/")
      setDispositivos(response.data)
    } catch (error) {
      console.error("Error al obtener dispositivos", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dispositivos/${deviceId}/`)
      fetchDispositivos()
    } catch (error) {
      console.error("Error al eliminar el dispositivo", error)
    }
  }

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dispositivos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Inventario")
    XLSX.writeFile(wb, "Inventario.xlsx")
  }

  const filteredDispositivos = dispositivos
    .filter(
      (dispositivo) =>
        dispositivo.modelo.toLowerCase().includes(search.toLowerCase()) ||
        dispositivo.marca.toLowerCase().includes(search.toLowerCase()) ||
        dispositivo.serial.toLowerCase().includes(search.toLowerCase()),
    )
    .filter(
      (dispositivo) =>
        (filtros.tipo ? dispositivo.tipo === filtros.tipo : true) &&
        (filtros.estado ? dispositivo.estado === filtros.estado : true) &&
        (filtros.sede ? dispositivo.sede && dispositivo.sede.nombre === filtros.sede : true),
    )

  return (
    <div className="inventory-container">
      <main className="main-content">

        <div className="metric-cards">
          <div className="metric-card">
            <div className="metric-content">
              <div>
                <p className="metric-title">Total dispositivos</p>
                <h3 className="metric-value">{dispositivos.length}</h3>
              </div>
              <div className="metric-icon">⭕</div>
            </div>
            <p className="metric-update">Actualizado</p>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div>
                <p className="metric-title">Dispositivos en uso</p>
                <h3 className="metric-value">{dispositivos.filter((d) => d.estado === "BUENO").length}</h3>
              </div>
              <div className="metric-icon">⭕</div>
            </div>
            <p className="metric-update">Actualizado</p>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div>
                <p className="metric-title">Dispositivos disponibles</p>
                <h3 className="metric-value">{dispositivos.filter((d) => d.estado === "MALO").length}</h3>
              </div>
              <div className="metric-icon">⭕</div>
            </div>
            <p className="metric-update">Actualizado</p>
          </div>
        </div>

        <div className="filters-container">
        <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
            className="filter-select"
          >
            <option value="">Todos los tipos</option>
            <option value="COMPUTADOR">Computador</option>
            <option value="MONITOR">Monitor</option>
          </select>
          <select
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            className="filter-select"
          >
            <option value="">Todos los estados</option>
            <option value="BUENO">Bueno</option>
            <option value="MALO">Malo</option>
          </select>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading">Cargando...</div>
          ) : (
            <table className="inventory-table">
              <thead>
                <tr>
                  {["Tipo", "Marca", "Modelo", "Serial", "Estado", "Sede", "Acciones"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDispositivos.map((dispositivo) => (
                  <tr key={dispositivo.id}>
                    <td>{dispositivo.tipo}</td>
                    <td>{dispositivo.marca}</td>
                    <td>{dispositivo.modelo}</td>
                    <td>{dispositivo.serial}</td>
                    <td>{dispositivo.estado}</td>
                    <td>{dispositivo.sede?.nombre || "N/A"}</td>
                    <td>
                      <button onClick={() => handleDelete(dispositivo.id)} className="delete-button">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="action-buttons">
          <button className="action-button">Importar Excel</button>
          <button className="action-button">Crear Dispositivo</button>
          <button onClick={handleExportExcel} className="action-button">
            <FileText size={18} /> Exportar Excel
          </button>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Gráficos de Inventario</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredDispositivos}>
              <XAxis dataKey="tipo" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}

export default Inventario