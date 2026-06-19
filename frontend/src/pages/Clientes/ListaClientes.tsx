import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { clientesService } from '../../services/clientesService';
import DataTable from '../../components/Common/DataTable';
import EstadoBadge from '../../components/Common/EstadoBadge';
import AccionesCliente from '../../components/Clientes/AccionesCliente';
import FiltrosClientes from '../../components/Clientes/FiltrosClientes';
import PageHeader from '../../components/Common/PageHeader';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const ListaClientes = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState({
          page: 1,
          limit: 10,
          search: '',
          estado: '',
          zonaId: '',
    });

    const [showFiltros, setShowFiltros] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [accionMasiva, setAccionMasiva] = useState('');

    // Query para obtener clientes
    const { data, isLoading, isError, refetch } = useQuery({
          queryKey: ['clientes', filters],
          queryFn: () => clientesService.getClientes(filters),
          keepPreviousData: true,
    });

    // Mutation para acciones masivas
    const accionMasivaMutation = useMutation({
          mutationFn: ({ accion, ids }) => clientesService.accionMasiva(accion, ids),
          onSuccess: () => {
                  toast.success('Accion ejecutada exitosamente');
                  queryClient.invalidateQueries(['clientes']);
                  setSelectedRows([]);
          },
          onError: (error) => {
                  toast.error('Error al ejecutar accion: ' + error.message);
          }
    });

    const columns = [
      {
              id: 'select',
              header: ({ table }) => (
                        <input
                                    type="checkbox"
                                    checked={table.getIsAllPageRowsSelected()}
                                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                                    className="rounded"
                                  />
                      ),
              cell: ({ row }) => (
                        <input
                                    type="checkbox"
                                    checked={row.getIsSelected()}
                                    onChange={row.getToggleSelectedHandler()}
                                    className="rounded"
                                  />
                      ),
      },
      {
              id: 'expand',
              cell: ({ row }) => (
                        <button
                                    onClick={() => row.toggleExpanded()}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                          {row.getIsExpanded() ? '-' : '+'}
                        </button>button>
                      )
      },
      {
              accessorKey: 'nombre',
              header: 'Nombre',
              cell: ({ row }) => (
                        <button
                                    onClick={() => navigate(`/panel/clientes/${row.original.id}`)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                  >
                          {row.original.nombre} {row.original.apellido}
                        </button>button>
                      ),
      },
      {
              accessorKey: 'servicio',
              header: 'Servicio',
              cell: ({ row }) => {
                        const servicio = row.original.servicios?.[0];
                        return servicio ? (
                                    <span className="text-sm">{servicio.usuario || `${row.original.id}@empresa`}</span>span>
                                  ) : '-';
              }
      },
      {
              accessorKey: 'ip',
              header: 'Ip',
              cell: ({ row }) => {
                        const servicio = row.original.servicios?.[0];
                        return <span className="font-mono text-sm">{servicio?.ip || '-'}</span>span>;
              }
      },
      {
              accessorKey: 'estado',
              header: 'Estado',
              cell: ({ row }) => {
                        const servicio = row.original.servicios?.[0];
                        return <EstadoBadge estado={servicio?.estado || row.original.estado} />;
              }
      },
      {
              accessorKey: 'plan',
              header: 'Plan Internet',
              cell: ({ row }) => {
                        const plan = row.original.servicios?.[0]?.plan;
                        return <span className="text-sm">{plan?.nombre || '-'}</span>span>;
              }
      },
      {
              accessorKey: 'router',
              header: 'Router',
              cell: ({ row }) => {
                        const router = row.original.servicios?.[0]?.router;
                        return <span className="text-sm">{router?.nombre || '-'}</span>span>;
              }
      },
      {
              accessorKey: 'direccion',
              header: 'Direccion',
              cell: ({ row }) => (
                        <span className="text-sm text-gray-600">{row.original.direccion}</span>span>
                      )
      },
      {
              id: 'accion',
              header: 'Accion',
              cell: ({ row }) => (
                        <AccionesCliente cliente={row.original} onRefresh={refetch} />
                      )
      }
        ];
  
    const handleSearch = (searchTerm) => {
          setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
    };
  
    const handleEjecutarAccion = () => {
          if (!accionMasiva) {
                  toast.warning('Seleccione una accion');
                  return;
          }
          if (selectedRows.length === 0) {
                  toast.warning('Seleccione al menos un cliente');
                  return;
          }
          accionMasivaMutation.mutate({
                  accion: accionMasiva,
                  ids: selectedRows.map(r => r.id)
          });
    };
  
    if (isError) {
          return (
                  <div className="flex items-center justify-center h-64">
                          <div className="text-center">
                                    <p className="text-red-500 mb-4">Error al cargar los clientes</p>p>
                                    <button onClick={() => refetch()} className="btn-primary">
                                                Reintentar
                                    </button>button>
                          </div>div>
                  </div>div>
                );
    }
  
    return (
          <div className="space-y-4">
                <PageHeader
                          title="Lista de Clientes"
                          icon="users"
                        />
          
            {/* Filtros y acciones superiores */}
                <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          {/* Selector de zona */}
                                  <select
                                                value={filters.zonaId}
                                                onChange={(e) => setFilters(prev => ({ ...prev, zonaId: e.target.value, page: 1 }))}
                                                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                              >
                                              <option value="">Seleccione una Zona</option>option>
                                  </select>select>
                        
                          {/* Boton agregar cliente */}
                                  <button
                                                onClick={() => navigate('/panel/clientes/nuevo')}
                                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                              >
                                              <FiPlus />
                                              Agregar Cliente
                                  </button>button>
                        </div>div>
                
                  {/* Acciones masivas */}
                        <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-600">Accion:</span>span>
                                  <select
                                                value={accionMasiva}
                                                onChange={(e) => setAccionMasiva(e.target.value)}
                                                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                              >
                                              <option value="">-----------</option>option>
                                              <option value="activar">Activar</option>option>
                                              <option value="suspender">Suspender</option>option>
                                              <option value="cancelar">Cancelar</option>option>
                                              <option value="generar_factura">Generar Factura</option>option>
                                              <option value="enviar_aviso">Enviar Aviso</option>option>
                                  </select>select>
                                  <button
                                                onClick={handleEjecutarAccion}
                                                disabled={accionMasivaMutation.isPending}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                              >
                                              Ejecutar
                                  </button>button>
                                  <span className="text-sm text-gray-500">{selectedRows.length} seleccionados/as</span>span>
                        </div>div>
                </div>div>
          
            {/* Tabla */}
                <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                                  <div className="flex items-center gap-2">
                                              <select
                                                              value={filters.limit}
                                                              onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
                                                              className="border rounded px-2 py-1 text-sm"
                                                            >
                                                            <option value={10}>Mostrar 10 registros</option>option>
                                                            <option value={25}>Mostrar 25 registros</option>option>
                                                            <option value={50}>Mostrar 50 registros</option>option>
                                                            <option value={100}>Mostrar 100 registros</option>option>
                                              </select>select>
                                  
                                    {/* Botones de exportacion */}
                                              <button className="p-2 border rounded hover:bg-gray-100" title="Copiar">
                                                            <FiDownload className="text-gray-600" />
                                              </button>button>
                                  </div>div>
                        
                          {/* Buscador */}
                                  <div className="flex items-center gap-2">
                                              <span className="text-sm text-gray-600">Buscar:</span>span>
                                              <div className="relative">
                                                            <input
                                                                              type="text"
                                                                              value={filters.search}
                                                                              onChange={(e) => handleSearch(e.target.value)}
                                                                              className="border rounded-lg px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                                              placeholder="Buscar..."
                                                                            />
                                                            <FiSearch className="absolute right-2 top-2.5 text-gray-400" />
                                              </div>div>
                                  </div>div>
                        </div>div>
                
                  {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                                  <LoadingSpinner />
                                  <span className="ml-3 text-gray-500">Cargando...</span>span>
                      </div>div>
                    ) : (
                      <DataTable
                                    data={data?.results || []}
                                    columns={columns}
                                    onRowSelectionChange={setSelectedRows}
                                    pagination={{
                                                    page: filters.page,
                                                    limit: filters.limit,
                                                    total: data?.count || 0,
                                                    onPageChange: (page) => setFilters(prev => ({ ...prev, page }))
                                    }}
                                  />
                    )}
                
                        <div className="p-4 border-t text-sm text-gray-500">
                                  Mostrando registros del {((filters.page - 1) * filters.limit) + 1} al {Math.min(filters.page * filters.limit, data?.count || 0)} de un total de {data?.count || 0} registros
                        </div>div>
                </div>div>
          </div>div>
        );
};

export default ListaClientes;</button>
