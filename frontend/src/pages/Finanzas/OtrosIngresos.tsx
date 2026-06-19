import { useState, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import api from '../../services/api';

interface Registro {
  id: number;
  folio: string;
  concepto: string;
  categoria: string;
  monto: number;
  fecha: string;
  creado_por: string;
}

export default function OtrosIngresos() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/facturas/otros-ingresos');
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
    { key: 'concepto', label: 'Concepto', sortable: true },
    { key: 'categoria', label: 'Categoria', sortable: true },
    {
      key: 'monto',
      label: 'Monto',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    { key: 'fecha', label: 'Fecha', sortable: true },
    { key: 'creado_por', label: 'Registrado por', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Otros Ingresos"
        icon={<FiTrendingUp />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Otros Ingresos' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
