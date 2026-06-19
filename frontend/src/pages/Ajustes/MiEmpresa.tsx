import { useState, useEffect } from 'react';
import { FiHome, FiSave } from 'react-icons/fi';
import PageHeader from '../../components/Common/PageHeader';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import api from '../../services/api';

interface Empresa {
  nombre: string;
  rfc: string;
  direccion: string;
  telefono: string;
  email: string;
  sitio_web: string;
  moneda: string;
}

export default function MiEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa>({
    nombre: '',
    rfc: '',
    direccion: '',
    telefono: '',
    email: '',
    sitio_web: '',
    moneda: 'MXN',
  });
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/ajustes/mi-empresa');
        if (res.data) setEmpresa((prev) => ({ ...prev, ...res.data }));
      } catch (e) {
        // sin datos previos
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await api.put('/ajustes/mi-empresa', empresa);
    } catch (err) {
      // manejar error
    } finally {
      setGuardando(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const campos: { name: keyof Empresa; label: string; type?: string }[] = [
    { name: 'nombre', label: 'Nombre de la Empresa' },
    { name: 'rfc', label: 'RFC' },
    { name: 'direccion', label: 'Direccion' },
    { name: 'telefono', label: 'Telefono', type: 'tel' },
    { name: 'email', label: 'Correo Electronico', type: 'email' },
    { name: 'sitio_web', label: 'Sitio Web', type: 'url' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi Empresa"
        icon={<FiHome />}
        breadcrumbs={[{ label: 'Ajustes' }, { label: 'Mi Empresa' }]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {campos.map((campo) => (
            <div key={campo.name} className={campo.name === 'direccion' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-600 mb-1">{campo.label}</label>
              <input
                type={campo.type || 'text'}
                name={campo.name}
                value={empresa[campo.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Moneda</label>
            <select
              name="moneda"
              value={empresa.moneda}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="MXN">MXN - Peso Mexicano</option>
              <option value="USD">USD - Dolar</option>
              <option value="COP">COP - Peso Colombiano</option>
              <option value="ARS">ARS - Peso Argentino</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={guardando}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <FiSave /> {guardando ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
