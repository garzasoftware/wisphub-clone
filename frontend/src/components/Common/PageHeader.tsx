import React from 'react';

interface Action {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: string;
}

interface Props {
    title: string;
    subtitle?: string;
    actions?: Action[];
    breadcrumbs?: { label: string; href?: string }[];
}

const btnStyle = (variant: string = 'primary') => ({
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    background: variant === 'primary' ? '#1890ff' : variant === 'danger' ? '#ff4d4f' : '#f5f5f5',
    color: variant === 'secondary' ? '#333' : '#fff',
    marginLeft: '8px'
});

const PageHeader: React.FC<Props> = ({ title, subtitle, actions = [], breadcrumbs = [] }) => (
    <div style={{ marginBottom: '24px' }}>
      {breadcrumbs.length > 0 && (
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
              {breadcrumbs.map((b, i) => (
                        <span key={i}>
                          {b.href ? <a href={b.href} style={{ color: '#1890ff' }}>{b.label}</a>a> : b.label}
                          {i < breadcrumbs.length - 1 && ' / '}
                        </span>span>
                      ))}
            </div>div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>{title}</h1>h1>
                    {subtitle && <p style={{ color: '#666', margin: '4px 0 0' }}>{subtitle}</p>p>}
                  </div>div>
            {actions.length > 0 && (
              <div>
                {actions.map((a, i) => (
                            <button key={i} onClick={a.onClick} style={btnStyle(a.variant)}>
                              {a.icon && <span style={{ marginRight: '6px' }}>{a.icon}</span>span>}
                              {a.label}
                            </button>button>
                          ))}
              </div>div>
                )}
          </div>div>
    </div>div>
  );

export default PageHeader;</div>
