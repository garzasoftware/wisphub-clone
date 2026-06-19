import { useState, useEffect } from 'react';
import { FiBox } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface Registro {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: string;
  precio: number;
  estado: string;
}

export default function OtrosArticulos() {
  const [items, setItems] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/almacen/otros-articulos');
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
    { key: 'nombre', label: 'Articulo', sortable: true },
    { key: 'categoria', label: 'Categoria', sortable: true },
    { key: 'cantidad', label: 'Cantidad', sortable: true },
    {
      key: 'precio',
      label: 'Precio Unitario',
      render: (value: number) => <span className="font-medium">${(value || 0).toLocaleString()}</span>,
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value: string) => <EstadoBadge estado={value as any} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Otros Articulos"
        icon={<FiBox />}
        breadcrumbs={[{ label: 'Almacen' }, { label: 'Otros Articulos' }]}
      />
      <div className="bg-white rounded-lg shadow">
        <DataTable data={items} columns={columns} loading={loading} pageSize={15} />
      </div>
    </div>
  );
}
