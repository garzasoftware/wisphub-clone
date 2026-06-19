import { useState, useEffect } from 'react';
import { FiHardDrive } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  mac: string;
  asignado_a: string;
  estado: string;
}

export default function ListaDispositivos() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/almacen/dispositivos');
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
    { key: 'nombre', label: 'Dispositivo', sortable: true },
    { key: 'marca', label: 'Marca', sortable: true },
    { key: 'modelo', label: 'Modelo', sortable: true },
    { key: 'mac', label: 'MAC', sortable: true },
    { key: 'asignado_a', label: 'Asignado a', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lista de Dispositivos"
        icon={<FiHardDrive />}
        breadcrumbs={[{ label: 'Almacen' }, { label: 'Lista de Dispositivos' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
