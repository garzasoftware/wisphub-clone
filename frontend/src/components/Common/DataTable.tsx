import React, { useState } from 'react';

export interface Column<T> {
    key: keyof T | string;
    title: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string;
    sortable?: boolean;
}

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    pagination?: {
      current: number;
      pageSize: number;
      total: number;
      onChange: (page: number) => void;
    };
    rowKey?: keyof T | ((row: T) => string);
    onRowClick?: (row: T) => void;
    emptyText?: string;
}

function DataTable<T extends Record<string, any>>({
    columns, data, loading = false, pagination, rowKey = 'id', onRowClick, emptyText = 'Sin datos'
}: Props<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const getKey = (row: T, i: number): string => {
        if (typeof rowKey === 'function') return rowKey(row);
        return String(row[rowKey as string] ?? i);
  };

  const getValue = (row: T, key: string) =>
        key.split('.').reduce((obj, k) => obj?.[k], row as any);

  const sorted = sortKey
      ? [...data].sort((a, b) => {
                const av = getValue(a, sortKey);
                const bv = getValue(b, sortKey);
                const cmp = av < bv ? -1 : av > bv ? 1 : 0;
                return sortDir === 'asc' ? cmp : -cmp;
      })
        : data;

  const handleSort = (col: Column<T>) => {
        if (!col.sortable) return;
        const k = String(col.key);
        if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(k); setSortDir('asc'); }
  };

  const thStyle: React.CSSProperties = {
        padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0',
        textAlign: 'left', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap'
  };
    const tdStyle: React.CSSProperties = {
          padding: '10px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '13px'
    };

  if (loading) {
        return (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>div>
                          Cargando...
                </div>div>
              );
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;

  return (
        <div>
              <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                                <thead>
                                            <tr>
                                              {columns.map((col, i) => (
                          <th
                                              key={i}
                                              style={{ ...thStyle, width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                                              onClick={() => handleSort(col)}
                                            >
                            {col.title}
                            {col.sortable && sortKey === String(col.key) && (
                                                                  <span style={{ marginLeft: '4px' }}>{sortDir === 'asc' ? '▲' : '▼'}</span>span>
                                            )}
                          </th>th>
                        ))}
                                            </tr>tr>
                                </thead>thead>
                                <tbody>
                                  {sorted.length === 0 ? (
                        <tr><td colSpan={columns.length} style={{ ...tdStyle, textAlign: 'center', color: '#999', padding: '40px' }}>{emptyText}</td>td></tr>tr>
                      ) : sorted.map((row, i) => (
                        <tr
                                          key={getKey(row, i)}
                                          onClick={() => onRowClick?.(row)}
                                          style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background .2s' }}
                                          onMouseEnter={e => { if (onRowClick) (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; }}
                                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; }}
                                        >
                          {columns.map((col, j) => (
                                                            <td key={j} style={tdStyle}>
                                                              {col.render
                                                                                      ? col.render(getValue(row, String(col.key)), row, i)
                                                                                      : getValue(row, String(col.key)) ?? '-'}
                                                            </td>td>
                                                          ))}
                        </tr>tr>
                      ))}
                                </tbody>tbody>
                      </table>table>
              </div>div>
          {pagination && totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#666' }}>
                                        Total: {pagination.total} registros
                            </span>span>
                            <button onClick={() => pagination.onChange(pagination.current - 1)} disabled={pagination.current <= 1}
                                          style={{ padding: '4px 8px', cursor: 'pointer', border: '1px solid #d9d9d9', borderRadius: '4px', background: '#fff' }}>
                                        &lt;
                            </button>button>
                            <span style={{ fontSize: '13px' }}>Pag. {pagination.current} / {totalPages}</span>span>
                            <button onClick={() => pagination.onChange(pagination.current + 1)} disabled={pagination.current >= totalPages}
                                          style={{ padding: '4px 8px', cursor: 'pointer', border: '1px solid #d9d9d9', borderRadius: '4px', background: '#fff' }}>
                                        &gt;
                            </button>button>
                  </div>div>
              )}
        </div>div>
      );
}

export default DataTable;</div>
