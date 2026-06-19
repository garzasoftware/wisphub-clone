import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import DataTable, { Column } from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import { facturasService } from '../../services/api';

interface PagoPendiente {
    id: number; numero_factura: string; cliente: string;
    id_servicio: string; estado_servicio: string; zona: string;
    monto: string; fecha_vencimiento: string;
}

const PagosPendientes: React.FC = () => {
    const [pagos, setPagos] = useState<PagoPendiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchPagos = useCallback(async () => {
          setLoading(true);
          try {
                  const resp = await facturasService.pendientes({ limit: 20, offset: (page-1)*20 });
                  setPagos(resp.rows || []); setTotal(resp.count || 0);
          } catch { setPagos([]); }
          setLoading(false);
    }, [page]);

    useEffect(() => { fetchPagos(); }, [fetchPagos]);

    const columns: Column<PagoPendiente>[] = [
      { key: 'numero_factura', title: '#Factura', sortable: true },
      { key: 'cliente', title: 'Cliente', sortable: true },
      { key: 'id_servicio', title: 'ID Servicio' },
      { key: 'estado_servicio', title: 'Estado Serv.', render: (v) => <EstadoBadge estado={v} size="sm" /> },
      { key: 'zona', title: 'Zona' },
      { key: 'monto', title: 'Monto', render: (v) => `$${parseFloat(v).toLocaleString('es-MX')}` },
      { key: 'fecha_vencimiento', title: 'Vencimiento' },
        ];

    return (
          <div>
                <PageHeader title="Pagos Pendientes" subtitle={`${total} pagos pendientes`}
                          breadcrumbs={[{label:'Inicio',href:'/'},{label:'Finanzas'},{label:'Pagos Pendientes'}]}
                        />
                <div style={{background:'#fff',borderRadius:'8px',overflow:'hidden'}}>
                        <DataTable columns={columns} data={pagos} loading={loading} rowKey="id"
                                    pagination={{current:page,pageSize:20,total,onChange:setPage}} emptyText="Sin pagos pendientes" />
                </div>div>
          </div>div>
        );
};

export default PagosPendientes;</div>
