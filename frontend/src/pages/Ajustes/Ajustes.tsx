import React, { useState } from 'react';
import PageHeader from '../../components/Common/PageHeader';

type Section = 'correo' | 'facturacion' | 'pasarelas' | 'whatsapp' | 'google_maps' | 'columnas';

const Ajustes: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('correo');
  const [saved, setSaved] = useState(false);

  const sections: { key: Section; label: string; icon: string }[] = [
    { key: 'correo', label: 'Servidor Correo', icon: '📧' },
    { key: 'facturacion', label: 'Facturacion', icon: '🧾' },
    { key: 'pasarelas', label: 'Pasarelas de Pago', icon: '💳' },
    { key: 'whatsapp', label: 'WhatsApp / SMS', icon: '💬' },
    { key: 'google_maps', label: 'Google Maps', icon: '🗺️' },
    { key: 'columnas', label: 'Columnas Visibles', icon: '📊' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'correo':
        return (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            {[
              {label:'Servidor SMTP', placeholder:'smtp.gmail.com'},
              {label:'Puerto', placeholder:'587'},
              {label:'Usuario', placeholder:'tu@email.com'},
              {label:'Contrasena', placeholder:'••••••••', type:'password'},
              {label:'Email Remitente', placeholder:'noreply@tuisp.com'},
              {label:'Nombre Remitente', placeholder:'ISP Support'},
            ].map(f => (
              <div key={f.label}>
                <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>{f.label}</label>
                <input type={f.type||'text'} placeholder={f.placeholder}
                  style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}} />
              </div>
            ))}
          </div>
        );
      case 'facturacion':
        return (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            {[
              {label:'Nombre Empresa', placeholder:'GySIS Telecom'},
              {label:'RFC/RUC', placeholder:'GARC123456ABC'},
              {label:'Direccion', placeholder:'Calle Principal #123'},
              {label:'Telefono', placeholder:'555-0000'},
              {label:'Moneda', placeholder:'MXN'},
              {label:'IVA (%)', placeholder:'16'},
            ].map(f => (
              <div key={f.label}>
                <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>{f.label}</label>
                <input type="text" placeholder={f.placeholder}
                  style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}} />
              </div>
            ))}
          </div>
        );
      case 'pasarelas':
        return (
          <div>
            <h4 style={{fontWeight:600,marginBottom:'16px'}}>Pasarelas de Pago Disponibles</h4>
            {['PayPal', 'Stripe', 'Conekta', 'MercadoPago', 'OpenPay'].map(p => (
              <div key={p} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                padding:'12px 16px',border:'1px solid #f0f0f0',borderRadius:'6px',marginBottom:'8px'}}>
                <span style={{fontWeight:500}}>{p}</span>
                <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                  <input placeholder="API Key" style={{padding:'4px 8px',border:'1px solid #d9d9d9',borderRadius:'4px',width:'200px'}} />
                  <label style={{display:'flex',alignItems:'center',gap:'6px',cursor:'pointer'}}>
                    <input type="checkbox" /> Habilitar
                  </label>
                </div>
              </div>
            ))}
          </div>
        );
      case 'whatsapp':
        return (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>API WhatsApp Business</label>
              <input placeholder="Tu API Key de WhatsApp"
                style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>Numero de Telefono</label>
              <input placeholder="+52 555 000 0000"
                style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>Proveedor SMS</label>
              <select style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}}>
                <option>Twilio</option><option>Nexmo</option><option>AWS SNS</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',marginBottom:'4px',fontSize:'13px',fontWeight:500}}>API Key SMS</label>
              <input placeholder="Tu API Key" type="password"
                style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box'}} />
            </div>
          </div>
        );
      case 'google_maps':
        return (
          <div>
            <label style={{display:'block',marginBottom:'8px',fontSize:'13px',fontWeight:500}}>Google Maps API Key</label>
            <input placeholder="AIzaSy..." type="password"
              style={{width:'100%',padding:'8px 12px',border:'1px solid #d9d9d9',borderRadius:'4px',boxSizing:'border-box',maxWidth:'500px'}} />
            <p style={{color:'#666',fontSize:'12px',marginTop:'8px'}}>
              Necesaria para el mapa de clientes. Obten tu key en console.cloud.google.com
            </p>
          </div>
        );
      default:
        return <div style={{color:'#999'}}>Seccion en construccion</div>;
    }
  };

  return (
    <div>
      <PageHeader title="Ajustes del Sistema"
        breadcrumbs={[{label:'Inicio',href:'/'},{label:'Ajustes'}]}
      />
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:'16px'}}>
        {/* Menu lateral */}
        <div style={{background:'#fff',borderRadius:'8px',padding:'8px'}}>
          {sections.map(s => (
            <button key={s.key} onClick={()=>setActiveSection(s.key)}
              style={{display:'flex',alignItems:'center',gap:'10px',width:'100%',padding:'10px 12px',
                border:'none',background: activeSection===s.key ? '#e6f7ff' : 'none',
                color: activeSection===s.key ? '#1890ff' : '#333',
                borderRadius:'6px',cursor:'pointer',textAlign:'left',fontSize:'13px',
                fontWeight: activeSection===s.key ? 600 : 400}}>
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
        {/* Contenido */}
        <div style={{background:'#fff',borderRadius:'8px',padding:'24px'}}>
          <h3 style={{margin:'0 0 20px',fontSize:'16px',fontWeight:600}}>
            {sections.find(s=>s.key===activeSection)?.label}
          </h3>
          {renderSection()}
          <div style={{marginTop:'24px',paddingTop:'16px',borderTop:'1px solid #f0f0f0',display:'flex',gap:'12px'}}>
            <button onClick={handleSave}
              style={{padding:'8px 24px',background:'#1890ff',color:'#fff',border:'none',borderRadius:'4px',cursor:'pointer'}}>
              {saved ? '✓ Guardado' : 'Guardar Cambios'}
            </button>
            <button style={{padding:'8px 16px',background:'#f5f5f5',border:'1px solid #d9d9d9',borderRadius:'4px',cursor:'pointer'}}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
