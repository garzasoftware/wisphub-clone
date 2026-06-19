import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import api from '../../services/api';

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  total_compras: number;
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/almacen/proveedores')
      .then((res) => setProveedores(res.data.rows || res.data))
      .catch(() => setProveedores([]))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'nombre', label: 'Proveedor', sortable: true },
    { key: 'contacto', label: 'Contacto' },
    { key: 'telefono', label: 'Telefono' },
    { key: 'email', label: 'Email' },
    { key: 'total_compras', label: 'Compras', sortable: true,
      render: (p: Proveedor) => `$${Number(p.total_compras).toLocaleString()}` },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Proveedores" breadcrumbs={['Almacen', 'Proveedores']}
        actions={[{ label: 'Nuevo Proveedor', onClick: () => {} }]} />
      <DataTable data={proveedores} columns={columns} loading={loading} pageSize={10} />
    </div>
  );
}

