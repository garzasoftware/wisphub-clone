import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import { ticketsService } from '../../services/api';

interface Ticket {
    id: number; numero_ticket: string; cliente: string; asunto: string;
    estado: string; prioridad: string; tecnico_asignado: string | null; abierto: string;
}

const prioColors: Record<string, string> = { baja:'#52c41a', media:'#faad14', alta:'#fa8c16', urgente:'#ff4d4f' };

const ListaTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [filtroEstado, setFiltroEstado] = useState('');

    const fetchTickets = useCallback(async () => {
          setLoading(true);
          try {
                  const params: any = { limit: 20, offset: (page-1)*20 };
                  if (filtroEstado) params.estado = filtroEstado;
                  const resp = await ticketsService.listar(params);
                  setTickets(resp.rows || []); setTotal(resp.count || 0);
          } catch { setTickets([]); }
          setLoading(false);
    }, [page, filtroEstado]);

    useEffect(() => { fetchTickets(); }, [fetchTickets]);

    const columns: Column<Ticket>[] = [
      { key: 'numero_ticket', title: '#Ticket', sortable: true },
      { key: 'cliente', title: 'Cliente', sortable: true },
      { key: 'asunto', title: 'Asunto' },
      { key: 'prioridad', title: 'Prioridad', render: (v) => (
              <span style={{ padding:'2px 8px', borderRadius:'10px', fontSize:'11px', fontWeight:600,
                                    background:prioColors[v]+'20', color:prioColors[v] }}>{v?.toUpperCase()}</span>span>
            )},
      { key: 'estado', title: 'Estado', render: (v) => <EstadoBadge estado={v} size="sm" /> },
      { key: 'tecnico_asignado', title: 'Tecnico', render: (v) => v || '-' },
      { key: 'abierto', title: 'Abierto', render: (v) => v ? new Date(v).toLocaleString('es-MX') : '-' },
        ];

    return (
          <div>
                <PageHeader title="Soporte Tecnico - Tickets" subtitle={`${total} tickets`}
                          breadcrumbs={[{label:'Inicio',href:'/'},{label:'Soporte'},{label:'Tickets'}]}
                          actions={[{label:'+ Nuevo Ticket', onClick:()=>{}, variant:'primary'}]}
                        />
                <div style={{background:'#fff',padding:'16px',borderRadius:'8px',marginBottom:'16px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
                        <select value={filtroEstado} onChange={e=>{setFiltroEstado(e.target.value);setPage(1);}}
                                    style={{padding:'6px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',fontSize:'14px'}}>
                                  <option value="">Todos los estados</option>option>
                          {['abierto','en_progreso','resuelto','cerrado'].map(e=>(
                                                  <option key={e} value={e}>{e.replace('_',' ')}</option>option>
                                                ))}
                        </select>select>
                </div>div>
                <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
                        <DataTable columns={columns} data={tickets} loading={loading} rowKey="id"
                                    pagination={{current:page,pageSize:20,total,onChange:setPage}} emptyText="No hay tickets" />
                </div>div>
          </div>div>
        );
};

export default ListaTickets;</div>
