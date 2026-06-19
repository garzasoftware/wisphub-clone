import { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  cliente: string;
  zona: string;
  saldo: number;
  estado: string;
  fecha_corte: string;
}

export default function TarjetasCobranza() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/facturas/tarjetas-cobranza');
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
    { key: 'zona', label: 'Zona', sortable: true },
    {
      key: 'saldo',
      label: 'Saldo',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
    { key: 'fecha_corte', label: 'Fecha de Corte', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tarjetas de Cobranza"
        icon={<FiCreditCard />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Tarjetas de Cobranza' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
