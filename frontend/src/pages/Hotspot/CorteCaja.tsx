import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiShoppingCart, FiCreditCard, FiActivity } from 'react-icons/fi';
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

export default function CorteCaja() {
  const { data, isLoading } = useQuery({
    queryKey: ['CorteCaja'],
    queryFn: async () => {
      try {
        const res = await api.get('/hotspot/corte-caja');
        return res.data || {};
      } catch (e) {
        return {};
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const d = data || {};
  const chartData = d.porPunto || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Corte de Caja"
        icon={<FiDollarSign />}
        breadcrumbs={[{ label: 'HotSpot' }, { label: 'Corte de Caja' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ventas del Dia" value={`$${(d.ventasDia || 0).toLocaleString()}`} icon={<FiShoppingCart className="text-white" size={20} />} color="bg-green-500" />
        <StatCard title="Efectivo" value={`$${(d.efectivo || 0).toLocaleString()}`} icon={<FiDollarSign className="text-white" size={20} />} color="bg-blue-500" />
        <StatCard title="Transferencias" value={`$${(d.transferencias || 0).toLocaleString()}`} icon={<FiCreditCard className="text-white" size={20} />} color="bg-purple-500" />
        <StatCard title="Fichas Vendidas" value={d.fichasVendidas || 0} icon={<FiActivity className="text-white" size={20} />} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Ventas por Punto de Venta</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" name="Ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
