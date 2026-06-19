import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  titulo: string;
  mensaje: string;
  destinatarios: string;
  estado: string;
  fecha_envio: string;
}

export default function NotificacionesPush() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/clientes/notificaciones');
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
    { key: 'titulo', label: 'Titulo', sortable: true },
    { key: 'mensaje', label: 'Mensaje', sortable: true },
    { key: 'destinatarios', label: 'Destinatarios', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'fecha_envio', label: 'Fecha de Envio', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notificaciones Push"
        icon={<FiBell />}
        breadcrumbs={[{ label: 'Clientes' }, { label: 'Notificaciones Push' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
