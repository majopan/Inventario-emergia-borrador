    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { 
    Card, CardContent, Button, Input, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody 
    } from "@mui/material";
    import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
    import * as XLSX from "xlsx";
    import { Trash2, FileText } from "lucide-react";

    const Inventario = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtros, setFiltros] = useState({ tipo: "", estado: "", sede: "" });

    useEffect(() => {
        fetchDispositivos();
    }, []);

    const fetchDispositivos = async () => {
        try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/dispositivos/");
        setDispositivos(response.data);
        } catch (error) {
        console.error("Error al obtener dispositivos", error);
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
        await axios.delete(`/api/dispositivos/${id}/`);
        fetchDispositivos();
        } catch (error) {
        console.error("Error al eliminar el dispositivo", error);
        }
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dispositivos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventario");
        XLSX.writeFile(wb, "Inventario.xlsx");
    };

    const filteredDispositivos = dispositivos.filter((dispositivo) =>
        dispositivo.modelo.toLowerCase().includes(search.toLowerCase()) ||
        dispositivo.marca.toLowerCase().includes(search.toLowerCase()) ||
        dispositivo.serial.toLowerCase().includes(search.toLowerCase())
    ).filter((dispositivo) =>
        (filtros.tipo ? dispositivo.tipo === filtros.tipo : true) &&
        (filtros.estado ? dispositivo.estado === filtros.estado : true) &&
        (filtros.sede ? (dispositivo.sede && dispositivo.sede.nombre === filtros.sede) : true)
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        {/* Contenedor principal */}
        <div className="max-w-7xl mx-auto">
            {/* Filtros y botones */}
            <Card className="mb-4 bg-white shadow-lg rounded-xl p-4">
            <CardContent>
                <div className="flex flex-wrap gap-4 items-center">
                <Input
                    placeholder="Buscar por modelo, marca o serial"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-500 w-full sm:w-auto"
                />
                <Select 
                    value={filtros.tipo} 
                    onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                    className="bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="COMPUTADOR">Computador</MenuItem>
                    <MenuItem value="MONITOR">Monitor</MenuItem>
                </Select>
                <Select 
                    value={filtros.estado} 
                    onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                    className="bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="BUENO">Bueno</MenuItem>
                    <MenuItem value="MALO">Malo</MenuItem>
                </Select>
                <Button 
                    onClick={handleExportExcel}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <FileText className="mr-2" /> Exportar Excel
                </Button>
                </div>
            </CardContent>
            </Card>

            {/* Tabla de Inventario */}
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent>
                {loading ? (
                <div className="flex justify-center py-10 text-lg">Cargando...</div>
                ) : (
                <div className="overflow-x-auto">
                    <Table className="w-full border border-gray-300 rounded-lg">
                    <TableHead className="bg-gray-800 text-white">
                        <TableRow>
                        {["Tipo", "Marca", "Modelo", "Serial", "Estado", "Sede", "Acciones"].map((head) => (
                            <TableCell key={head} className="py-2 px-4 font-semibold">{head}</TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDispositivos.map((dispositivo) => (
                        <TableRow key={dispositivo.id} className="border-b border-gray-300 hover:bg-gray-200 transition">
                            <TableCell className="py-2 px-4">{dispositivo.tipo}</TableCell>
                            <TableCell className="py-2 px-4">{dispositivo.marca}</TableCell>
                            <TableCell className="py-2 px-4">{dispositivo.modelo}</TableCell>
                            <TableCell className="py-2 px-4">{dispositivo.serial}</TableCell>
                            <TableCell className="py-2 px-4">{dispositivo.estado}</TableCell>
                            <TableCell className="py-2 px-4">{dispositivo.sede?.nombre || "N/A"}</TableCell>
                            <TableCell className="py-2 px-4">
                            <Button 
                                onClick={() => handleDelete(dispositivo.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center"
                            >
                                <Trash2 />
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
                )}
            </CardContent>
            </Card>

            {/* Gráfico */}
            <Card className="mt-6 bg-white shadow-lg rounded-xl p-4">
            <CardContent>
                <h2 className="text-lg font-bold mb-4">Gráficos de Inventario</h2>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredDispositivos}>
                    <XAxis dataKey="tipo" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Bar dataKey="cantidad" fill="#3b82f6" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>
        </div>
        </div>
    );
    };

    export default Inventario;