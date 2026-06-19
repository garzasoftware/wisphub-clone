import { useState, useEffect } from 'react';
import { FiActivity } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  cliente: string;
  ip: string;
  descarga: string;
  subida: string;
  estado: string;
  ultima_conexion: string;
}

export default function Trafico() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/clientes/trafico');
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
    { key: 'cliente', label: 'Cliente', sortable: true },
    { key: 'ip', label: 'Direccion IP', sortable: true },
    { key: 'descarga', label: 'Descarga (Mbps)', sortable: true },
    { key: 'subida', label: 'Subida (Mbps)', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'ultima_conexion', label: 'Ultima Conexion', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trafico"
        icon={<FiActivity />}
        breadcrumbs={[{ label: 'Clientes' }, { label: 'Trafico' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
