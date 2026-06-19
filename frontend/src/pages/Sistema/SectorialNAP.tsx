import { useState, useEffect } from 'react';
import { FiShare2 } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  tipo: string;
  zona: string;
  capacidad: string;
  ocupacion: string;
  estado: string;
}

export default function SectorialNAP() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/sistema/sectorial-nap');
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
    { key: 'zona', label: 'Zona', sortable: true },
    { key: 'capacidad', label: 'Capacidad', sortable: true },
    { key: 'ocupacion', label: 'Ocupacion', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sectorial / Nodo / NAP"
        icon={<FiShare2 />}
        breadcrumbs={[{ label: 'Sistema' }, { label: 'Sectorial / Nodo / NAP' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
