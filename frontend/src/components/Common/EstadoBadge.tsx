import React from 'react';

type Estado = 'activo' | 'suspendido' | 'cancelado' | 'pendiente' | 'pagado' | 'abierto' | 'en_progreso' | 'cerrado' | 'resuelto' | string;

interface Props {
    estado: Estado;
    size?: 'sm' | 'md';
}

const colorMap: Record<string, { bg: string; color: string; label: string }> = {
    activo:      { bg: '#f6ffed', color: '#52c41a', label: 'Activo' },
    suspendido:  { bg: '#fff7e6', color: '#fa8c16', label: 'Suspendido' },
    cancelado:   { bg: '#fff1f0', color: '#ff4d4f', label: 'Cancelado' },
    pendiente:   { bg: '#fffbe6', color: '#faad14', label: 'Pendiente' },
    pagado:      { bg: '#f6ffed', color: '#52c41a', label: 'Pagado' },
    abierto:     { bg: '#e6f7ff', color: '#1890ff', label: 'Abierto' },
    en_progreso: { bg: '#fff7e6', color: '#fa8c16', label: 'En Progreso' },
    cerrado:     { bg: '#f5f5f5', color: '#999',    label: 'Cerrado' },
    resuelto:    { bg: '#f6ffed', color: '#52c41a', label: 'Resuelto' },
};

const EstadoBadge: React.FC<Props> = ({ estado, size = 'md' }) => {
    const key = (estado || '').toLowerCase().replace(' ', '_');
    const config = colorMap[key] || { bg: '#f5f5f5', color: '#666', label: estado };
    const padding = size === 'sm' ? '2px 8px' : '4px 12px';
    const fontSize = size === 'sm' ? '11px' : '12px';

    return (
          <span style={{
                  display: 'inline-block',
                  padding,
                  fontSize,
                  fontWeight: 500,
                  borderRadius: '12px',
                  background: config.bg,
                  color: config.color,
                  border: `1px solid ${config.color}30`,
                  textTransform: 'capitalize'
          }}>
            {config.label}
          </span>span>
        );
};

export default EstadoBadge;
