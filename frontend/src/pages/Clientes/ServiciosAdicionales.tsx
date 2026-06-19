import { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  cliente: string;
  servicio: string;
  tipo: string;
  precio: number;
  estado: string;
  fecha_alta: string;
}

export default function ServiciosAdicionales() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/clientes/servicios-adicionales');
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
    { key: 'servicio', label: 'Servicio', sortable: true },
    { key: 'tipo', label: 'Tipo', sortable: true },
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
    { key: 'fecha_alta', label: 'Fecha de Alta', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Servicios Adicionales"
        icon={<FiPlusCircle />}
        breadcrumbs={[{ label: 'Clientes' }, { label: 'Servicios Adicionales' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
