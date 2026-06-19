import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import api from '../../services/api';

interface Gasto {
  id: number;
  folio: string;
  concepto: string;
  categoria: string;
  monto: number;
  fecha: string;
  creado_por: string;
}

export default function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    api.get('/gastos', { params: { categoria } })
      .then((res) => setGastos(res.data.rows || res.data))
      .catch(() => setGastos([]))
      .finally(() => setLoading(false));
  }, [categoria]);

  const total = gastos.reduce((sum, g) => sum + Number(g.monto), 0);

  const columns = [
    { key: 'folio', label: 'Folio', sortable: true },
    { key: 'concepto', label: 'Concepto' },
    { key: 'categoria', label: 'Categoria', sortable: true },
    { key: 'monto', label: 'Monto', sortable: true,
      render: (g: Gasto) => `$${Number(g.monto).toLocaleString()}` },
    { key: 'fecha', label: 'Fecha', sortable: true },
    { key: 'creado_por', label: 'Registrado por' },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Gastos" breadcrumbs={['Finanzas', 'Gastos']}
        actions={[{ label: 'Nuevo Gasto', onClick: () => {} }]} />
      <div className="flex gap-4 mb-4">
        <select className="border rounded px-3 py-2" value={categoria}
          onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las categorias</option>
          <option value="Nomina">Nomina</option>
          <option value="Equipos">Equipos</option>
          <option value="Internet Troncal">Internet Troncal</option>
          <option value="Servicios">Servicios</option>
        </select>
        <div className="ml-auto bg-red-50 px-4 py-2 rounded">
          <span className="text-sm text-gray-600">Total: </span>
          <span className="font-bold text-red-600">${total.toLocaleString()}</span>
        </div>
      </div>
      <DataTable data={gastos} columns={columns} loading={loading} pageSize={15} />
    </div>
  );
}

