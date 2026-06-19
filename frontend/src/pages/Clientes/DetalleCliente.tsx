import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import EstadoBadge from '../../components/Common/EstadoBadge';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import api from '../../services/api';

const TABS = ['General', 'Facturas', 'Tickets', 'Conexion', 'Documentos'];

export default function DetalleCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<any>(null);
  const [tab, setTab] = useState('General');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/clientes/${id}`)
      .then((res) => setCliente(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!cliente) return <div className="p-6">Cliente no encontrado</div>;

  return (
    <div className="p-6">
      <PageHeader title={cliente.nombre}
        breadcrumbs={['Clientes', cliente.nombre]} />
      <div className="flex items-center gap-3 mb-4">
        <EstadoBadge estado={cliente.estado} />
        <span className="text-gray-500">{cliente.plan} - {cliente.zona}</span>
      </div>
      <div className="border-b flex gap-4 mb-4">
        {TABS.map((t) => (
          <button key={t}
            className={`pb-2 px-1 ${tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-5">
        {tab === 'General' && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-gray-500">Email</dt><dd>{cliente.email}</dd></div>
            <div><dt className="text-gray-500">Telefono</dt><dd>{cliente.telefono}</dd></div>
            <div><dt className="text-gray-500">Direccion</dt><dd>{cliente.direccion}</dd></div>
            <div><dt className="text-gray-500">IP</dt><dd>{cliente.ip}</dd></div>
          </dl>
        )}
        {tab === 'Facturas' && <p className="text-gray-500">Historial de facturas del cliente</p>}
        {tab === 'Tickets' && <p className="text-gray-500">Tickets de soporte asociados</p>}
        {tab === 'Conexion' && <p className="text-gray-500">Estado de conexion y trafico</p>}
        {tab === 'Documentos' && <p className="text-gray-500">Documentos y contratos</p>}
      </div>
    </div>
  );
}

