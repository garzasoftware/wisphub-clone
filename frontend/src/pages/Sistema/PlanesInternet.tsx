import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import { planesService } from '../../services/api';

interface Plan {
  id: number; nombre: string; precio: number;
  descarga: number; subida: number; tipo: string; activo: boolean;
}

const TABS = ['queue', 'pcq', 'hotspot', 'pppoe'];
const TAB_LABELS: Record<string, string> = {
  queue: 'Queue', pcq: 'PCQ', hotspot: 'HotSpot', pppoe: 'PPPoE'
};

const PlanesInternet: React.FC = () => {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('queue');

  useEffect(() => {
    setLoading(true);
    planesService.listar({ tipo: activeTab })
      .then(resp => setPlanes(resp.rows || []))
      .catch(() => setPlanes([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const columns: Column<Plan>[] = [
    { key: 'nombre', title: 'Nombre Plan', sortable: true },
    { key: 'precio', title: 'Precio', render: (v) => '$' + Number(v).toLocaleString('es-MX'), sortable: true },
    { key: 'descarga', title: 'Descarga (Mbps)', render: (v) => v + ' Mbps' },
    { key: 'subida', title: 'Subida (Mbps)', render: (v) => v + ' Mbps' },
    { key: 'activo', title: 'Estado', render: (v) => (
      <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px',
        background: v ? '#f6ffed' : '#fff1f0', color: v ? '#52c41a' : '#ff4d4f' }}>
        {v ? 'Activo' : 'Inactivo'}
      </span>
    )},
  ];

  return (
    <div>
      <PageHeader title="Planes de Internet"
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Sistema'},{label:'Planes de Internet'}]}
        actions={[{label:'+ Nuevo Plan', onClick:()=>{}, variant:'primary'}]}
      />
      <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
        {/* Tabs */}
        <div style={{display:'flex',borderBottom:'1px solid #f0f0f0',padding:'0 16px'}}>
          {TABS.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)}
              style={{padding:'12px 24px',border:'none',background:'none',cursor:'pointer',
                borderBottom: activeTab===tab ? '2px solid #1890ff' : '2px solid transparent',
                color: activeTab===tab ? '#1890ff' : '#666',
                fontWeight: activeTab===tab ? 600 : 400}}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
        <DataTable
          columns={columns}
          data={planes}
          loading={loading}
          rowKey="id"
          emptyText={`No hay planes ${TAB_LABELS[activeTab]}`}
        />
      </div>
    </div>
  );
};

export default PlanesInternet;
