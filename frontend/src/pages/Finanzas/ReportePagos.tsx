import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import api from '../../services/api';

interface Pago {
  id: number;
  folio: string;
  cliente: string;
  monto: number;
  metodo_pago: string;
  fecha_pago: string;
}

export default function ReportePagos() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  useEffect(() => {
    api.get('/facturas', { params: { estado: 'pagada', desde, hasta } })
      .then((res) => setPagos(res.data.rows || res.data))
      .catch(() => setPagos([]))
      .finally(() => setLoading(false));
  }, [desde, hasta]);

  const total = pagos.reduce((s, p) => s + Number(p.monto), 0);

  const columns = [
    { key: 'folio', label: 'Folio', sortable: true },
    { key: 'cliente', label: 'Cliente' },
    { key: 'monto', label: 'Monto', sortable: true,
      render: (p: Pago) => `$${Number(p.monto).toLocaleString()}` },
    { key: 'metodo_pago', label: 'Metodo' },
    { key: 'fecha_pago', label: 'Fecha', sortable: true },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Reporte de Pagos" breadcrumbs={['Finanzas', 'Reporte de Pagos']} />
      <div className="flex gap-3 mb-4 items-end">
        <div>
          <label className="block text-sm text-gray-600">Desde</label>
          <input type="date" className="border rounded px-3 py-2"
            value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Hasta</label>
          <input type="date" className="border rounded px-3 py-2"
            value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
        <div className="ml-auto bg-green-50 px-4 py-2 rounded">
          <span className="text-sm text-gray-600">Total recaudado: </span>
          <span className="font-bold text-green-600">${total.toLocaleString()}</span>
        </div>
      </div>
      <DataTable data={pagos} columns={columns} loading={loading} pageSize={15} />
    </div>
  );
}

