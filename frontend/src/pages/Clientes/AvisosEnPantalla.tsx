import { useState, useEffect } from 'react';
import { FiMonitor } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Aviso {
  id: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
  clientes_afectados: number;
}

export default function AvisosEnPantalla() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/clientes/avisos-pantalla');
        setAvisos(res.data?.results || res.data || []);
      } catch (e) {
        setAvisos([]);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const columns = [
    { key: 'titulo', label: 'Titulo', sortable: true },
    { key: 'tipo', label: 'Tipo', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value} />,
    },
    { key: 'fecha_inicio', label: 'Inicio', sortable: true },
    { key: 'fecha_fin', label: 'Fin', sortable: true },
    {
      key: 'clientes_afectados',
      label: 'Clientes',
      render: (value: number) => <span className="font-medium">{value || 0}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Avisos en Pantalla"
        icon={<FiMonitor />}
        breadcrumbs={[{ label: 'Clientes' }, { label: 'Avisos en Pantalla' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={avisos} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
