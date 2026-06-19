import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import api from '../../services/api';

interface ClienteMapa {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  estado: string;
  zona: string;
}

export default function MapaClientes() {
  const [clientes, setClientes] = useState<ClienteMapa[]>([]);
  const [zonaFiltro, setZonaFiltro] = useState('');

  useEffect(() => {
    api.get('/clientes', { params: { con_ubicacion: true } })
      .then((res) => setClientes(res.data.rows || res.data))
      .catch(() => setClientes([]));
  }, []);

  const filtrados = zonaFiltro
    ? clientes.filter((c) => c.zona === zonaFiltro)
    : clientes;

  return (
    <div className="p-6">
      <PageHeader title="Mapa de Clientes" breadcrumbs={['Clientes', 'Mapa']} />
      <div className="flex gap-3 mb-4">
        <select className="border rounded px-3 py-2" value={zonaFiltro}
          onChange={(e) => setZonaFiltro(e.target.value)}>
          <option value="">Todas las zonas</option>
          <option value="Centro">Centro</option>
          <option value="Norte">Norte</option>
          <option value="Sur">Sur</option>
        </select>
        <span className="ml-auto text-sm text-gray-600 self-center">
          {filtrados.length} clientes con ubicacion
        </span>
      </div>
      <div className="bg-gray-100 rounded-lg border h-[500px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {filtrados.map((c, i) => (
          <div key={c.id}
            className="absolute w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white"
            style={{ left: `${20 + (i * 37) % 60}%`, top: `${15 + (i * 23) % 70}%` }}
            title={`${c.nombre} - ${c.estado}`} />
        ))}
        <span className="text-gray-400 z-10">Mapa interactivo (integrar Leaflet/Google Maps)</span>
      </div>
    </div>
  );
}

