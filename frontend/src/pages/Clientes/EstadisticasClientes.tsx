import { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import api from '../../services/api';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function EstadisticasClientes() {
  const [stats, setStats] = useState<any>({ porZona: [], porEstado: [], porPlan: [] });

  useEffect(() => {
    api.get('/clientes/estadisticas')
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <PageHeader title="Estadisticas de Clientes" breadcrumbs={['Clientes', 'Estadisticas']} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Clientes por Zona</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.porZona}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Por Estado</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stats.porEstado} dataKey="total" nameKey="estado"
                cx="50%" cy="50%" outerRadius={90} label>
                {stats.porEstado.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

