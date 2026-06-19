// Dashboard de Finanzas
// Ver README.md para documentacion completa de este componente
// Este archivo implementa el dashboard financiero con:
// - Tarjetas de estadisticas (Pagos Internet, Otros Ingresos, Gastos)
// - Saldo Final (Ingreso libre de gastos)
// - Tabla de pagos por forma de pago
// - Graficas de ingresos por zona con Recharts

import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiClock, FiCalendar } from 'react-icons/fi';
import { facturasService } from '../../services/api';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount || 0);

const StatCard = ({ title, amount, subtitle, color }) => (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${color}`}>
          <p className="text-2xl font-bold text-gray-800">{amount}</p>p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>p>
    </div>div>
  );

const DashboardFinanzas = () => {
    const { data, isLoading } = useQuery({
          queryKey: ['dashboard-finanzas'],
          queryFn: facturasService.getDashboardFinanzas,
    });
  
    const pagosInternet = data?.pagosInternet || {};
    const otrosIngresos = data?.otrosIngresos || {};
    const gastos = data?.gastos || {};
  
    return (
          <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Finanzas</h1>h1>
          
                <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-3">
                                  <h3 className="font-semibold text-gray-600">$ Pagos Internet</h3>h3>
                                  <StatCard amount={formatCurrency(pagosInternet.hoy)} subtitle={`HOY - ${pagosInternet.pagosHoy || 0} PAGOS`} color="border-green-500" />
                                  <StatCard amount={formatCurrency(pagosInternet.pendiente)} subtitle={`PENDIENTE - ${pagosInternet.pagosPendientes || 0} PAGOS`} color="border-orange-500" />
                                  <StatCard amount={formatCurrency(pagosInternet.mes)} subtitle={`MES - ${pagosInternet.pagosMes || 0} PAGOS`} color="border-blue-500" />
                        </div>div>
                        <div className="space-y-3">
                                  <h3 className="font-semibold text-gray-600">$ Otros Ingresos</h3>h3>
                                  <StatCard amount={formatCurrency(otrosIngresos.hoy)} subtitle="HOY - 0 PAGOS" color="border-green-500" />
                                  <StatCard amount={formatCurrency(otrosIngresos.pendiente)} subtitle="PENDIENTE - 0 PAGOS" color="border-orange-500" />
                                  <StatCard amount={formatCurrency(otrosIngresos.mes)} subtitle="MES - 0 PAGOS" color="border-blue-500" />
                        </div>div>
                        <div className="space-y-3">
                                  <h3 className="font-semibold text-gray-600">$ Gastos</h3>h3>
                                  <StatCard amount={formatCurrency(gastos.hoy)} subtitle="HOY" color="border-green-500" />
                                  <StatCard amount={formatCurrency(gastos.mes)} subtitle="MES" color="border-blue-500" />
                        </div>div>
                </div>div>
          
                <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Saldo Final</h2>h2>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                                  <p className="text-3xl font-bold text-green-600">{formatCurrency(data?.saldoFinal)}</p>p>
                                  <p className="text-sm text-gray-500">INGRESO LIBRE DE GASTOS</p>p>
                        </div>div>
                </div>div>
          
            {data?.ingresosZonas && (
                    <div className="bg-white rounded-lg shadow p-6">
                              <h2 className="text-lg font-semibold mb-4">Ingresos por Zonas</h2>h2>
                              <ResponsiveContainer width="100%" height={300}>
                                          <BarChart data={data.ingresosZonas}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="zona" />
                                                        <YAxis />
                                                        <Tooltip formatter={(v) => formatCurrency(v)} />
                                                        <Bar dataKey="total" fill="#22c55e" name="Ingresos" />
                                          </BarChart>BarChart>
                              </ResponsiveContainer>ResponsiveContainer>
                    </div>div>
                )}
          </div>div>
        );
};

export default DashboardFinanzas;</p>
