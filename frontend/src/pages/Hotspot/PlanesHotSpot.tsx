import { useState, useEffect } from 'react';
import { FiWifi } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  prefijo: string;
  duracion: string;
  velocidad: string;
  precio: number;
  estado: string;
}

export default function PlanesHotSpot() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/hotspot/planes');
        setItems(res.data?.results || res.data || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const columns = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'prefijo', label: 'Prefijo', sortable: true },
    { key: 'duracion', label: 'Duracion', sortable: true },
    { key: 'velocidad', label: 'Velocidad', sortable: true },
    {
      key: 'precio',
      label: 'Precio',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planes / Prefijos HotSpot"
        icon={<FiWifi />}
        breadcrumbs={[{ label: 'HotSpot' }, { label: 'Planes / Prefijos HotSpot' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
