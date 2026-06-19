import { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  minutos: string;
  estado: string;
}

export default function PlanesTelefonia() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/sistema/planes-telefonia');
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
    { key: 'tipo', label: 'Tipo', sortable: true },
    {
      key: 'precio',
      label: 'Precio',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    { key: 'minutos', label: 'Minutos / Canales', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planes de Telefonia y TV"
        icon={<FiPhone />}
        breadcrumbs={[{ label: 'Sistema' }, { label: 'Planes de Telefonia y TV' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
