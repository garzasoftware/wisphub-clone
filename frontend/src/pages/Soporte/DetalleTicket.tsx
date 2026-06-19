import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import EstadoBadge from '../../components/Common/EstadoBadge';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import api from '../../services/api';

export default function DetalleTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setComentarios(res.data.comentarios || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const agregarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    const res = await api.post(`/tickets/${id}/comentarios`, { texto: nuevoComentario });
    setComentarios([...comentarios, res.data]);
    setNuevoComentario('');
  };

  if (loading) return <LoadingSpinner />;
  if (!ticket) return <div className="p-6">Ticket no encontrado</div>;

  return (
    <div className="p-6">
      <PageHeader title={`Ticket ${ticket.folio}`}
        breadcrumbs={['Soporte', 'Tickets', ticket.folio]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">{ticket.asunto}</h2>
            <EstadoBadge estado={ticket.estado} />
          </div>
          <p className="text-gray-700 mb-4">{ticket.descripcion}</p>
          <h3 className="font-semibold mb-2">Comentarios</h3>
          <div className="space-y-3 mb-4">
            {comentarios.map((c, i) => (
              <div key={i} className="border-l-2 border-blue-400 pl-3 py-1">
                <p className="text-sm">{c.texto}</p>
                <span className="text-xs text-gray-400">{c.autor} - {c.fecha}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded px-3 py-2"
              placeholder="Agregar comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={agregarComentario}>Enviar</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="font-semibold mb-3">Detalles</h3>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-gray-500">Cliente</dt><dd>{ticket.cliente}</dd></div>
            <div><dt className="text-gray-500">Categoria</dt><dd>{ticket.categoria}</dd></div>
            <div><dt className="text-gray-500">Prioridad</dt><dd>{ticket.prioridad}</dd></div>
            <div><dt className="text-gray-500">Asignado a</dt><dd>{ticket.tecnico}</dd></div>
            <div><dt className="text-gray-500">Apertura</dt><dd>{ticket.fecha_apertura}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

