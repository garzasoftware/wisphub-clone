import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  cliente: string;
  monto: number;
  fecha_promesa: string;
  estado: string;
  creado_por: string;
}

export default function PromesasPago() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/facturas/promesas-pago');
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
    {
      key: 'monto',
      label: 'Monto',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    { key: 'fecha_promesa', label: 'Fecha Promesa', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'creado_por', label: 'Registrado por', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Promesas de Pago"
        icon={<FiClock />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Promesas de Pago' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
