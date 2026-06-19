import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiAlertCircle, FiClock, FiCheckCircle, FiActivity } from 'react-icons/fi';
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

export default function EstadisticasSoporte() {
  const { data, isLoading } = useQuery({
    queryKey: ['EstadisticasSoporte'],
    queryFn: async () => {
      try {
        const res = await api.get('/tickets/estadisticas');
        return res.data || {};
      } catch (e) {
        return {};
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const d = data || {};
  const chartData = d.porCategoria || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Estadisticas de Soporte"
        icon={<FiBarChart2 />}
        breadcrumbs={[{ label: 'Soporte' }, { label: 'Estadisticas de Soporte' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tickets Abiertos" value={d.abiertos || 0} icon={<FiAlertCircle className="text-white" size={20} />} color="bg-amber-500" />
        <StatCard title="En Progreso" value={d.enProgreso || 0} icon={<FiClock className="text-white" size={20} />} color="bg-blue-500" />
        <StatCard title="Resueltos" value={d.resueltos || 0} icon={<FiCheckCircle className="text-white" size={20} />} color="bg-green-500" />
        <StatCard title="Tiempo Prom. (h)" value={d.tiempoPromedio || 0} icon={<FiActivity className="text-white" size={20} />} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tickets por Categoria</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" name="Tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
