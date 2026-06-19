import { useState, useEffect } from 'react';
import { FiLayout } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  tipo: string;
  canal: string;
  estado: string;
  actualizado: string;
}

export default function Plantillas() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/sistema/plantillas');
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
    { key: 'canal', label: 'Canal', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'actualizado', label: 'Actualizado', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plantillas"
        icon={<FiLayout />}
        breadcrumbs={[{ label: 'Sistema' }, { label: 'Plantillas' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
