import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Zona {
  id: number;
  nombre: string;
  descripcion: string;
  total_clientes: number;
  activa: boolean;
  color: string;
}

export default function Zonas() {
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/zonas')
      .then((res) => setZonas(res.data.rows || res.data))
      .catch(() => setZonas([]))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'nombre', label: 'Zona', sortable: true,
      render: (z: Zona) => (
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: z.color }} />
          {z.nombre}
        </div>
      ) },
    { key: 'descripcion', label: 'Descripcion' },
    { key: 'total_clientes', label: 'Clientes', sortable: true },
    { key: 'activa', label: 'Estado',
      render: (z: Zona) => <EstadoBadge estado={z.activa ? 'activo' : 'inactivo'} /> },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Zonas"
        breadcrumbs={['Sistema', 'Zonas']}
        actions={[{ label: 'Nueva Zona', onClick: () => {} }]}
      />
      <DataTable data={zonas} columns={columns} loading={loading} pageSize={10} />
    </div>
  );
}

