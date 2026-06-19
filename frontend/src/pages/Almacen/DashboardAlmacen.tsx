import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import { useNavigate } from 'react-router-dom';

const COLORS = { disponible:'#52c41a', ocupado:'#1890ff', asignado:'#722ed1', reparacion:'#fa8c16', dado_de_baja:'#ff4d4f' };

const DashboardAlmacen: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
          import('../../services/api').then(({ almacenService }) => {
                  almacenService.dashboard().then(setStats).catch(console.error);
          });
    }, []);

    const porEstado = stats?.por_estado || {};
    const totalDisp = Object.values(porEstado).reduce((a: any, b: any) => a + b, 0) as number || 1;

    return (
          <div>
                <PageHeader title="Dashboard Almacen" subtitle="Gestion de inventario"
                          breadcrumbs={[{label:'Inicio',href:'/'},{label:'Almacen'}]}
                        />
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'16px',marginBottom:'24px'}}>
                  {[
            {label:'Stocks',value:stats?.stocks??0,color:'#1890ff'},
            {label:'Productos WiFi',value:stats?.total_dispositivos_wifi??0,color:'#52c41a'},
            {label:'Otros Articulos',value:stats?.otros_articulos??0,color:'#fa8c16'},
            {label:'Otros Servicios',value:stats?.otros_servicios??0,color:'#722ed1'},
                    ].map(c => (
                                <div key={c.label} style={{background:'#fff',borderRadius:'8px',padding:'20px',
                                                                       borderLeft:`4px solid ${c.color}`,boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>
                                            <div style={{fontSize:'28px',fontWeight:700,color:c.color}}>{c.value}</div>div>
                                            <div style={{fontSize:'14px',color:'#666',marginTop:'4px'}}>{c.label}</div>div>
                                </div>div>
                              ))}
                </div>div>
                <div style={{background:'#fff',borderRadius:'8px',padding:'24px'}}>
                        <h3 style={{margin:'0 0 16px',fontSize:'16px',fontWeight:600}}>Distribucion por Estado</h3>h3>
                        <div style={{display:'flex',height:'32px',borderRadius:'4px',overflow:'hidden',marginBottom:'16px'}}>
                          {Object.entries(porEstado).map(([estado, count]: [string, any]) => (
                        count > 0 && (
                                        <div key={estado} title={`${estado}: ${count}`}
                                                          style={{width:`${(count/totalDisp)*100}%`,background:(COLORS as any)[estado]||'#ccc',
                                                                                    display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'11px',fontWeight:600}}>
                                          {count}
                                        </div>div>
                                      )
                      ))}
                        </div>div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:'16px'}}>
                          {Object.entries(porEstado).map(([estado, count]: [string, any]) => (
                        <div key={estado} style={{display:'flex',alignItems:'center',gap:'8px'}}>
                                      <div style={{width:'12px',height:'12px',borderRadius:'2px',background:(COLORS as any)[estado]||'#ccc'}} />
                                      <span style={{fontSize:'13px',color:'#555',textTransform:'capitalize'}}>
                                        {estado.replace('_',' ')}: <strong>{count}</strong>strong>
                                      </span>span>
                        </div>div>
                      ))}
                        </div>div>
                </div>div>
          </div>div>
        );
};

export default DashboardAlmacen;</div>
