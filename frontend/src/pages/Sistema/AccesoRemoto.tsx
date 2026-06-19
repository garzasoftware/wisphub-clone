import { useState, useEffect } from 'react';
import { FiWifi } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  dispositivo: string;
  ip: string;
  tipo: string;
  estado: string;
  ultima_conexion: string;
}

export default function AccesoRemoto() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/sistema/acceso-remoto');
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
    { key: 'dispositivo', label: 'Dispositivo', sortable: true },
    { key: 'ip', label: 'IP', sortable: true },
    { key: 'tipo', label: 'Tipo', sortable: true },
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
        title="Acceso Remoto VPN"
        icon={<FiWifi />}
        breadcrumbs={[{ label: 'Sistema' }, { label: 'Acceso Remoto VPN' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
