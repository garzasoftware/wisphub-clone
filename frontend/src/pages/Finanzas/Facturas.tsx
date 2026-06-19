import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import { facturasService } from '../../services/api';

interface Factura {
  id: number; numero_factura: string; cajero: string; cliente: string;
  fecha_emision: string; fecha_pago: string | null; estado: string;
  zona: string; forma_pago: string; total: string;
}

const Facturas: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const fetchFacturas = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { limit: 20, offset: (page-1)*20 };
      if (fechaInicio) params.fecha_inicio = fechaInicio;
      if (fechaFin) params.fecha_fin = fechaFin;
      if (filtroEstado) params.estado = filtroEstado;
      const resp = await facturasService.listar(params);
      setFacturas(resp.rows || []); setTotal(resp.count || 0);
    } catch { setFacturas([]); }
    setLoading(false);
  }, [page, fechaInicio, fechaFin, filtroEstado]);

  useEffect(() => { fetchFacturas(); }, [fetchFacturas]);

  const columns: Column<Factura>[] = [
    { key: 'numero_factura', title: '#Factura', sortable: true },
    { key: 'cajero', title: 'Cajero' },
    { key: 'cliente', title: 'Cliente', sortable: true },
    { key: 'fecha_emision', title: 'Fecha Emision' },
    { key: 'fecha_pago', title: 'Fecha Pago', render: (v) => v || '-' },
    { key: 'estado', title: 'Estado', render: (v) => <EstadoBadge estado={v} size="sm" /> },
    { key: 'zona', title: 'Zona' },
    { key: 'forma_pago', title: 'Forma Pago' },
    { key: 'total', title: 'Total', render: (v) => '$' + parseFloat(v).toLocaleString('es-MX'), sortable: true },
  ];

  const inputStyle = { padding: '6px 10px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '13px' };

  return (
    <div>
      <PageHeader title="Facturas" subtitle={`${total} facturas`}
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Finanzas'},{label:'Facturas'}]}
      />
      <div style={{background:'#fff',padding:'16px',borderRadius:'8px',marginBottom:'16px',display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'flex-end'}}>
        <div>
          <label style={{display:'block',fontSize:'12px',marginBottom:'4px',color:'#666'}}>Fecha Inicio</label>
          <input type="date" value={fechaInicio} onChange={e=>setFechaInicio(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{display:'block',fontSize:'12px',marginBottom:'4px',color:'#666'}}>Fecha Fin</label>
          <input type="date" value={fechaFin} onChange={e=>setFechaFin(e.target.value)} style={inputStyle} />
        </div>
        <select value={filtroEstado} onChange={e=>{setFiltroEstado(e.target.value);setPage(1);}} style={inputStyle}>
          <option value="">Todos los estados</option>
          <option value="pagado">Pagado</option>
          <option value="pendiente">Pendiente</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button onClick={()=>fetchFacturas()}
          style={{padding:'6px 16px',background:'#1890ff',color:'#fff',border:'none',borderRadius:'4px',cursor:'pointer'}}>
          Filtrar
        </button>
      </div>
      <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
        <DataTable columns={columns} data={facturas} loading={loading} rowKey="id"
          pagination={{current:page,pageSize:20,total,onChange:setPage}} emptyText="No hay facturas" />
      </div>
    </div>
  );
};

export default Facturas;
