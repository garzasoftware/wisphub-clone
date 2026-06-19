import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import { routersService } from '../../services/api';

interface Router {
  id: number; nombre: string; ip: string; usuario: string;
  api: boolean; marca: string; modelo: string; zona: string; activo: boolean;
}

const Routers: React.FC = () => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState<number | null>(null);

  useEffect(() => {
    routersService.listar({})
      .then(resp => setRouters(resp.rows || []))
      .catch(() => setRouters([]))
      .finally(() => setLoading(false));
  }, []);

  const testConnection = async (router: Router) => {
    setTesting(router.id);
    try {
      const result = await routersService.testConexion(router.id);
      alert(result.conectado ? `Router ${router.nombre} conectado! Latencia: ${result.latencia_ms}ms` : `Router ${router.nombre} sin conexion`);
    } catch { alert('Error al probar conexion'); }
    setTesting(null);
  };

  const columns: Column<Router>[] = [
    { key: 'nombre', title: 'Nombre', sortable: true },
    { key: 'ip', title: 'IP', sortable: true },
    { key: 'usuario', title: 'Usuario' },
    { key: 'marca', title: 'Marca' },
    { key: 'modelo', title: 'Modelo' },
    { key: 'zona', title: 'Zona', sortable: true },
    { key: 'api', title: 'API', render: (v) => (
      <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'11px',
        background: v ? '#f6ffed' : '#fff1f0', color: v ? '#52c41a' : '#ff4d4f'}}>
        {v ? 'Habilitada' : 'No'}
      </span>
    )},
    { key: 'activo', title: 'Estado', render: (v) => (
      <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'11px',
        background: v ? '#f6ffed' : '#f5f5f5', color: v ? '#52c41a' : '#999'}}>
        {v ? 'Activo' : 'Inactivo'}
      </span>
    )},
    { key: 'id', title: 'Acciones', render: (_, row) => (
      <button onClick={()=>testConnection(row)}
        disabled={testing === row.id}
        style={{padding:'4px 12px',background:'#1890ff',color:'#fff',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>
        {testing === row.id ? 'Probando...' : 'Test'}
      </button>
    )},
  ];

  return (
    <div>
      <PageHeader title="Routers" subtitle={`${routers.length} routers configurados`}
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Sistema'},{label:'Routers'}]}
        actions={[{label:'+ Agregar Router', onClick:()=>{}, variant:'primary'}]}
      />
      <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
        <DataTable columns={columns} data={routers} loading={loading} rowKey="id" emptyText="No hay routers" />
      </div>
    </div>
  );
};

export default Routers;
