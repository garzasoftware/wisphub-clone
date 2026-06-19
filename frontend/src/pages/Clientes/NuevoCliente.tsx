import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import api from '../../services/api';

export default function NuevoCliente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', direccion: '',
    plan_id: '', zona_id: '', router_id: '', ip: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/clientes', form);
      navigate('/clientes/buscar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <PageHeader title="Nuevo Cliente" breadcrumbs={['Clientes', 'Nuevo Cliente']} />
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={handleChange}
              className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Telefono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">IP asignada</label>
            <input name="ip" value={form.ip} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Direccion</label>
            <input name="direccion" value={form.direccion} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar Cliente'}
          </button>
          <button type="button" onClick={() => navigate(-1)}
            className="border px-5 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

