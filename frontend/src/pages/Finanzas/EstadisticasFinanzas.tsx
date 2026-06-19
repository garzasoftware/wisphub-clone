import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiDollarSign, FiClock } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import api from '../../services/api';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
}

export default function EstadisticasFinanzas() {
  const { data, isLoading } = useQuery({
    queryKey: ['EstadisticasFinanzas'],
    queryFn: async () => {
      try {
        const res = await api.get('/facturas/estadisticas');
        return res.data || {};
      } catch (e) {
        return {};
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const d = data || {};
  const chartData = d.porZona || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Estadisticas de Finanzas"
        icon={<FiBarChart2 />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Estadisticas de Finanzas' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos del Mes" value={`$${(d.ingresos || 0).toLocaleString()}`} icon={<FiTrendingUp className="text-white" size={20} />} color="bg-green-500" />
        <StatCard title="Gastos del Mes" value={`$${(d.gastos || 0).toLocaleString()}`} icon={<FiTrendingDown className="text-white" size={20} />} color="bg-red-500" />
        <StatCard title="Balance" value={`$${((d.ingresos || 0) - (d.gastos || 0)).toLocaleString()}`} icon={<FiDollarSign className="text-white" size={20} />} color="bg-blue-500" />
        <StatCard title="Por Cobrar" value={`$${(d.porCobrar || 0).toLocaleString()}`} icon={<FiClock className="text-white" size={20} />} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingresos por Zona</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" name="Ingresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
