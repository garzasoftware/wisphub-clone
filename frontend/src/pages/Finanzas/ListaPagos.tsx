import { useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  folio: string;
  cliente: string;
  monto: number;
  forma_pago: string;
  estado: string;
  fecha: string;
}

export default function ListaPagos() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/facturas/lista-pagos');
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
    { key: 'folio', label: 'Folio', sortable: true },
    { key: 'cliente', label: 'Cliente', sortable: true },
    {
      key: 'monto',
      label: 'Monto',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    { key: 'forma_pago', label: 'Forma de Pago', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'fecha', label: 'Fecha', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lista de Pagos"
        icon={<FiDollarSign />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Lista de Pagos' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
