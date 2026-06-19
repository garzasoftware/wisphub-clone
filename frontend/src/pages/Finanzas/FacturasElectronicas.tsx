import { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  uuid: string;
  cliente: string;
  rfc: string;
  total: number;
  estado: string;
  fecha_timbrado: string;
}

export default function FacturasElectronicas() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/facturas/electronicas');
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
    { key: 'uuid', label: 'UUID', sortable: true },
    { key: 'cliente', label: 'Cliente', sortable: true },
    { key: 'rfc', label: 'RFC', sortable: true },
    {
      key: 'total',
      label: 'Total',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'fecha_timbrado', label: 'Fecha Timbrado', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturas Electronicas"
        icon={<FiFileText />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Facturas Electronicas' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
