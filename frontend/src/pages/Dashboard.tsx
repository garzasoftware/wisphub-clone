import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiUserCheck, FiUserX, FiDollarSign, FiAlertCircle, FiActivity } from 'react-icons/fi';
import PageHeader from '../components/Common/PageHeader';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { clientesService, facturasService } from '../services/api';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
}

const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function Dashboard() {
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['clientes-estadisticas'],
    queryFn: () => clientesService.getEstadisticas(),
  });

  const { data: finanzas, isLoading: loadingFin } = useQuery({
    queryKey: ['dashboard-finanzas'],
    queryFn: () => facturasService.getDashboardFinanzas(),
  });

  if (loadingStats || loadingFin) return <LoadingSpinner />;

  const s = stats?.data || {};
  const f = finanzas?.data || {};

  const clientesPorEstado = [
    { name: 'Activos', value: s.activos || 0 },
    { name: 'Suspendidos', value: s.suspendidos || 0 },
    { name: 'Cortados', value: s.cortados || 0 },
    { name: 'Retirados', value: s.retirados || 0 },
  ];

  const ingresosMensuales = f.ingresosMensuales || [];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" icon={<FiActivity />} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clientes"
          value={s.total || 0}
          subtitle="Registrados en el sistema"
          icon={<FiUsers className="text-white" size={20} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Clientes Activos"
          value={s.activos || 0}
          subtitle="Con servicio activo"
          icon={<FiUserCheck className="text-white" size={20} />}
          color="bg-green-500"
        />
        <StatCard
          title="Suspendidos / Cortados"
          value={(s.suspendidos || 0) + (s.cortados || 0)}
          subtitle="Requieren atencion"
          icon={<FiUserX className="text-white" size={20} />}
          color="bg-red-500"
        />
        <StatCard
          title="Pagos Pendientes"
          value={`$${(f.pagosPendientes || 0).toLocaleString()}`}
          subtitle="Por cobrar"
          icon={<FiAlertCircle className="text-white" size={20} />}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ingresosMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" name="Ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Clientes por Estado</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientesPorEstado}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {clientesPorEstado.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center gap-3 mb-2">
          <FiDollarSign className="text-green-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">Resumen Financiero del Mes</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Ingresos</p>
            <p className="text-xl font-bold text-green-600">${(f.ingresos || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gastos</p>
            <p className="text-xl font-bold text-red-600">${(f.gastos || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-xl font-bold text-gray-800">${((f.ingresos || 0) - (f.gastos || 0)).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Facturas Emitidas</p>
            <p className="text-xl font-bold text-gray-800">{f.facturasEmitidas || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
