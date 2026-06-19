import React, { useState } from 'react';
import PageHeader from '../../components/Common/PageHeader';

interface StaffMember {
  id: number; nombre: string; email: string; rol: string; activo: boolean;
}

const staffData: StaffMember[] = [
  { id:1, nombre:'GySIS Telecom', email:'admin@gysistelecom.com', rol:'Admin', activo:true },
  { id:2, nombre:'Uriel Benitez', email:'uriel@gysistelecom.com', rol:'Tecnico', activo:true },
  { id:3, nombre:'Gisela Huerta', email:'gisela@gysistelecom.com', rol:'Admin', activo:true },
  { id:4, nombre:'Jesus Alamilla', email:'jesus@gysistelecom.com', rol:'Admin', activo:true },
  { id:5, nombre:'Yanet Torres', email:'yanet@gysistelecom.com', rol:'Admin', activo:true },
  { id:6, nombre:'Raul Gomez', email:'raul@gysistelecom.com', rol:'Tecnico', activo:true },
  { id:7, nombre:'Soporte GySIS', email:'soporte@gysistelecom.com', rol:'Admin', activo:true },
  { id:8, nombre:'Lizeth Rodriguez', email:'lizeth@gysistelecom.com', rol:'Admin', activo:true },
  { id:9, nombre:'JOSE ZAMORA', email:'jose@gysistelecom.com', rol:'Tecnico', activo:true },
];

const rolColor = { Admin: '#1890ff', Tecnico: '#52c41a' };

const Staff: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const filtrados = staffData.filter(s => s.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <div>
      <PageHeader title="Staff" subtitle={staffData.length + " miembros"}
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Staff'}]}
      />
      <div style={{background:'#fff',padding:'16px',borderRadius:'8px',marginBottom:'16px'}}>
        <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
          placeholder="Buscar..." style={{padding:'6px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',width:'300px'}} />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
        {filtrados.map(s => (
          <div key={s.id} style={{background:'#fff',borderRadius:'8px',padding:'20px',
            boxShadow:'0 1px 4px rgba(0,0,0,0.1)',display:'flex',gap:'16px',alignItems:'center'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',
              background:rolColor[s.rol as keyof typeof rolColor]||'#ccc',
              display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'18px',fontWeight:700}}>
              {s.nombre[0]}
            </div>
            <div>
              <div style={{fontWeight:600}}>{s.nombre}</div>
              <div style={{fontSize:'12px',color:'#999'}}>{s.email}</div>
              <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'11px',
                background:(rolColor[s.rol as keyof typeof rolColor]||'#ccc')+'20',
                color:rolColor[s.rol as keyof typeof rolColor]||'#666'}}>{s.rol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
