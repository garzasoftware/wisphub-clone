import { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  codigo: string;
  plan: string;
  precio: number;
  estado: string;
  fecha_creacion: string;
}

export default function FichasHotSpot() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/hotspot/fichas');
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
    { key: 'codigo', label: 'Codigo', sortable: true },
    { key: 'plan', label: 'Plan', sortable: true },
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
    { key: 'fecha_creacion', label: 'Creada', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fichas HotSpot"
        icon={<FiCreditCard />}
        breadcrumbs={[{ label: 'HotSpot' }, { label: 'Fichas HotSpot' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
