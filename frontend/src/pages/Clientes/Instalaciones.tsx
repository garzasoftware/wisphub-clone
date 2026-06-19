import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import { clientesService } from '../../services/api';

interface Instalacion {
  id: number; usuario: string; nombre: string; numero: string;
  direccion: string; tecnico: string; fecha_instalacion: string; estado: string;
}

const Instalaciones: React.FC = () => {
  const [instalaciones, setInstalaciones] = useState<any[]>([]);
  const [preInstalaciones, setPreInstalaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'instalaciones' | 'pre'>('instalaciones');

  useEffect(() => {
    clientesService.instalaciones({ tipo: 'instalacion' })
      .then(resp => setInstalaciones(resp.rows || []))
      .catch(() => setInstalaciones([]));
    clientesService.instalaciones({ tipo: 'pre-instalacion' })
      .then(resp => setPreInstalaciones(resp.rows || []))
      .catch(() => setPreInstalaciones([]))
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<any>[] = [
    { key: 'id', title: 'ID' },
    { key: 'usuario', title: 'Usuario' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'numero', title: 'Numero' },
    { key: 'direccion', title: 'Direccion' },
    { key: 'tecnico', title: 'Tecnico', render: (v) => v || 'Sin asignar' },
    { key: 'fecha_instalacion', title: 'Fecha' },
    { key: 'estado', title: 'Estado', render: (v) => (
      <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'11px',
        background:v==='completado'?'#f6ffed':'#fffbe6',color:v==='completado'?'#52c41a':'#faad14'}}>
        {v||'Pendiente'}
      </span>
    )},
  ];

  const data = activeTab === 'instalaciones' ? instalaciones : preInstalaciones;

  return (
    <div>
      <PageHeader title="Instalaciones"
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Clientes'},{label:'Instalaciones'}]}
        actions={[{label:'+ Nueva Instalacion', onClick:()=>{}, variant:'primary'}]}
      />
      <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
        <div style={{display:'flex',borderBottom:'1px solid #f0f0f0',padding:'0 16px'}}>
          {[
            {key:'instalaciones',label:'Instalaciones'},
            {key:'pre',label:'Pre-Instalaciones'}
          ].map(t => (
            <button key={t.key} onClick={()=>setActiveTab(t.key as any)}
              style={{padding:'12px 24px',border:'none',background:'none',cursor:'pointer',
                borderBottom:activeTab===t.key?'2px solid #1890ff':'2px solid transparent',
                color:activeTab===t.key?'#1890ff':'#666',fontWeight:activeTab===t.key?600:400}}>
              {t.label}
            </button>
          ))}
        </div>
        <DataTable columns={columns} data={data} loading={loading} rowKey="id"
          emptyText="No hay instalaciones" />
      </div>
    </div>
  );
};

export default Instalaciones;
