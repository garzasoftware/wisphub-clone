import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import { almacenService } from '../../services/api';

interface Dispositivo {
  id: number; nombre: string; marca: string; modelo: string;
  serie: string; mac: string; estado: string; ip_asignada: string | null;
  cliente_asignado: string | null; ubicacion: string; precio_compra: string;
}

const ESTADO_COLORS: Record<string, string> = {
  disponible: '#52c41a', ocupado: '#1890ff', asignado: '#722ed1',
  reparacion: '#fa8c16', dado_de_baja: '#ff4d4f'
};

const StockDispositivos: React.FC = () => {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filtroEstado, setFiltroEstado] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { limit: 20, offset: (page-1)*20 };
      if (filtroEstado) params.estado = filtroEstado;
      const resp = await almacenService.listarDispositivos(params);
      setDispositivos(resp.rows || []); setTotal(resp.count || 0);
    } catch { setDispositivos([]); }
    setLoading(false);
  }, [page, filtroEstado]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<Dispositivo>[] = [
    { key: 'nombre', title: 'Dispositivo', sortable: true },
    { key: 'marca', title: 'Marca' },
    { key: 'modelo', title: 'Modelo' },
    { key: 'serie', title: 'No. Serie' },
    { key: 'mac', title: 'MAC' },
    { key: 'estado', title: 'Estado', render: (v) => (
      <span style={{padding:'2px 10px',borderRadius:'10px',fontSize:'11px',fontWeight:500,
        background:(ESTADO_COLORS[v]||'#ccc')+'20',color:ESTADO_COLORS[v]||'#666',textTransform:'capitalize'}}>
        {v?.replace('_',' ')}
      </span>
    )},
    { key: 'cliente_asignado', title: 'Cliente', render: (v) => v || '-' },
    { key: 'ubicacion', title: 'Ubicacion' },
    { key: 'precio_compra', title: 'Precio', render: (v) => '$' + parseFloat(v).toLocaleString('es-MX') },
  ];

  return (
    <div>
      <PageHeader title="Stock Dispositivos de Red" subtitle={`${total} dispositivos WiFi`}
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Almacen'},{label:'Stock Dispositivos'}]}
        actions={[{label:'+ Agregar Dispositivo', onClick:()=>{}, variant:'primary'}]}
      />
      <div style={{background:'#fff',padding:'16px',borderRadius:'8px',marginBottom:'16px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
        <select value={filtroEstado} onChange={e=>{setFiltroEstado(e.target.value);setPage(1);}}
          style={{padding:'6px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',fontSize:'14px'}}>
          <option value="">Todos los estados</option>
          {['disponible','ocupado','asignado','reparacion','dado_de_baja'].map(e=>(
            <option key={e} value={e}>{e.replace('_',' ')}</option>
          ))}
        </select>
      </div>
      <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
        <DataTable columns={columns} data={dispositivos} loading={loading} rowKey="id"
          pagination={{current:page,pageSize:20,total,onChange:setPage}} emptyText="No hay dispositivos" />
      </div>
    </div>
  );
};

export default StockDispositivos;
