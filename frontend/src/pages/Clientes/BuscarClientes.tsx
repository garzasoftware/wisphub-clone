import React, { useState } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import { clientesService } from '../../services/api';

const BuscarClientes: React.FC = () => {
    const [clientes, setClientes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [tipoBusqueda, setTipoBusqueda] = useState('nombre');
    const [valor, setValor] = useState('');
    const [estado, setEstado] = useState('');

    const buscar = async () => {
          setLoading(true);
          try {
                  const params: any = { limit: 50, offset: 0 };
                  if (estado) params.estado = estado;
                  if (valor) params[tipoBusqueda] = valor;
                  const resp = await clientesService.listar(params);
                  setClientes(resp.rows || []); setTotal(resp.count || 0);
          } catch { setClientes([]); }
          setLoading(false);
    };

    const columns: Column<any>[] = [
      { key: 'username', title: 'Usuario' },
      { key: 'nombre', title: 'Nombre' },
      { key: 'estado', title: 'Estado', render: (v) => <EstadoBadge estado={v} size="sm" /> },
      { key: 'ip', title: 'IP' },
      { key: 'plan_internet', title: 'Plan' },
      { key: 'zona', title: 'Zona' },
        ];

    return (
          <div>
                <PageHeader title="Buscar Clientes"
                          breadcrumbs={[{label:'Inicio',href:'/'},{label:'Clientes'},{label:'Buscar'}]}
                        />
                <div style={{background:'#fff',padding:'20px',borderRadius:'8px',marginBottom:'16px'}}>
                        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'16px'}}>
                                  <select value={tipoBusqueda} onChange={e=>setTipoBusqueda(e.target.value)}
                                                style={{padding:'6px 10px',border:'1px solid #d9d9d9',borderRadius:'4px'}}>
                                              <option value="nombre">Nombre</option>option>
                                              <option value="username">Usuario</option>option>
                                              <option value="ip">IP</option>option>
                                  </select>select>
                                  <input value={valor} onChange={e=>setValor(e.target.value)}
                                                placeholder="Valor..." style={{padding:'6px 10px',border:'1px solid #d9d9d9',borderRadius:'4px',minWidth:'200px'}} />
                                  <select value={estado} onChange={e=>setEstado(e.target.value)}
                                                style={{padding:'6px 10px',border:'1px solid #d9d9d9',borderRadius:'4px'}}>
                                              <option value="">Estado</option>option>
                                              <option value="activo">Activo</option>option>
                                              <option value="suspendido">Suspendido</option>option>
                                              <option value="cancelado">Cancelado</option>option>
                                  </select>select>
                                  <button onClick={buscar} style={{padding:'6px 20px',background:'#1890ff',color:'#fff',border:'none',borderRadius:'4px',cursor:'pointer'}}>
                                              Buscar
                                  </button>button>
                        </div>div>
                </div>div>
            {clientes.length > 0 && (
                    <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
                              <div style={{padding:'12px 16px',borderBottom:'1px solid #f0f0f0'}}>{total} clientes encontrados</div>div>
                              <DataTable columns={columns} data={clientes} loading={loading} rowKey="id" />
                    </div>div>
                )}
          </div>div>
        );
};

export default BuscarClientes;</div>
