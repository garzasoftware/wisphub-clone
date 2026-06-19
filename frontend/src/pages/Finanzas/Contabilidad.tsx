import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBook, FiTrendingUp, FiTrendingDown, FiDollarSign, FiFileText } from 'react-icons/fi';
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

export default function Contabilidad() {
  const { data, isLoading } = useQuery({
    queryKey: ['Contabilidad'],
    queryFn: async () => {
      try {
        const res = await api.get('/facturas/contabilidad');
        return res.data || {};
      } catch (e) {
        return {};
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const d = data || {};
  const chartData = d.porMes || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contabilidad"
        icon={<FiBook />}
        breadcrumbs={[{ label: 'Finanzas' }, { label: 'Contabilidad' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Ingresos" value={`$${(d.totalIngresos || 0).toLocaleString()}`} icon={<FiTrendingUp className="text-white" size={20} />} color="bg-green-500" />
        <StatCard title="Total Egresos" value={`$${(d.totalEgresos || 0).toLocaleString()}`} icon={<FiTrendingDown className="text-white" size={20} />} color="bg-red-500" />
        <StatCard title="Utilidad Neta" value={`$${(d.utilidad || 0).toLocaleString()}`} icon={<FiDollarSign className="text-white" size={20} />} color="bg-blue-500" />
        <StatCard title="Impuestos" value={`$${(d.impuestos || 0).toLocaleString()}`} icon={<FiFileText className="text-white" size={20} />} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Movimientos por Mes</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" name="Monto" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
