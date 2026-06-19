import { useState, useEffect } from 'react';
import { FiRepeat } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  frecuencia: string;
  ultima_ejecucion: string;
  proxima_ejecucion: string;
  estado: string;
}

export default function TareasPeriodicas() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/sistema/tareas-periodicas');
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
    { key: 'nombre', label: 'Tarea', sortable: true },
    { key: 'frecuencia', label: 'Frecuencia', sortable: true },
    { key: 'ultima_ejecucion', label: 'Ultima Ejecucion', sortable: true },
    { key: 'proxima_ejecucion', label: 'Proxima Ejecucion', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tareas Periodicas"
        icon={<FiRepeat />}
        breadcrumbs={[{ label: 'Sistema' }, { label: 'Tareas Periodicas' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
