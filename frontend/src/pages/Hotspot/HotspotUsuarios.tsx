import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import api from '../../services/api';

interface UsuarioHotspot {
  id: number;
  usuario: string;
  perfil: string;
  tiempo_restante: string;
  estado: string;
  ip: string;
  mac: string;
}

export default function HotspotUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioHotspot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/hotspot/usuarios')
      .then((res) => setUsuarios(res.data.rows || res.data))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'usuario', label: 'Usuario', sortable: true },
    { key: 'perfil', label: 'Perfil' },
    { key: 'ip', label: 'IP' },
    { key: 'mac', label: 'MAC' },
    { key: 'tiempo_restante', label: 'Tiempo restante' },
    { key: 'estado', label: 'Estado',
      render: (u: UsuarioHotspot) => <EstadoBadge estado={u.estado} /> },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Usuarios HotSpot" breadcrumbs={['HotSpot', 'Usuarios']}
        actions={[{ label: 'Generar Tickets', onClick: () => {} }]} />
      <DataTable data={usuarios} columns={columns} loading={loading} pageSize={15} />
    </div>
  );
}

