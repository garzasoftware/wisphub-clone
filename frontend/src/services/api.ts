import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
          'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Request interceptor - agregar token
api.interceptors.request.use(
    (config) => {
          const token = localStorage.getItem('wisphub-auth');
          if (token) {
                  try {
                            const parsed = JSON.parse(token);
                            if (parsed.state?.token) {
                                        config.headers.Authorization = `Bearer ${parsed.state.token}`;
                            }
                  } catch (e) {
                            console.error('Error parsing auth token');
                  }
          }
          return config;
    },
    (error) => Promise.reject(error)
  );

// Response interceptor - manejo de errores
api.interceptors.response.use(
    (response) => response,
    async (error) => {
          const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              // Limpiar sesion
            localStorage.removeItem('wisphub-auth');
              window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

export default api;

// Servicio de clientes
export const clientesService = {
    getClientes: async (params: any) => {
          const response = await api.get('/clientes/', { params });
          return response.data;
    },

    getCliente: async (id: number) => {
          const response = await api.get(`/clientes/${id}/`);
          return response.data;
    },

    createCliente: async (data: FormData) => {
          const response = await api.post('/clientes/', data, {
                  headers: { 'Content-Type': 'multipart/form-data' }
          });
          return response.data;
    },

    updateServicio: async (id: number, data: any) => {
          const response = await api.put(`/clientes/${id}/servicio/`, data);
          return response.data;
    },

    deleteServicio: async (id: number) => {
          const response = await api.delete(`/clientes/${id}/servicio/`);
          return response.data;
    },

    buscarClientes: async (params: any) => {
          const response = await api.get('/clientes/buscar/', { params });
          return response.data;
    },

    getEstadisticas: async (params: any) => {
          const response = await api.get('/clientes/estadisticas/', { params });
          return response.data;
    },

    getInstalaciones: async (params: any) => {
          const response = await api.get('/instalaciones/', { params });
          return response.data;
    },

    accionMasiva: async (accion: string, ids: number[]) => {
          const response = await api.post('/clientes/accion-masiva/', { accion, ids });
          return response.data;
    },
};

// Servicio de facturas
export const facturasService = {
    getFacturas: async (params: any) => {
          const response = await api.get('/facturas/', { params });
          return response.data;
    },

    getPagosPendientes: async (params: any) => {
          const response = await api.get('/pagos/', { params });
          return response.data;
    },

    registrarPago: async (facturaId: number, data: any) => {
          const response = await api.post(`/facturas/${facturaId}/pagar/`, data);
          return response.data;
    },

    getReportePagos: async (params: any) => {
          const response = await api.get('/reporte-pagos/', { params });
          return response.data;
    },

    getDashboardFinanzas: async () => {
          const response = await api.get('/dashboard/finanzas/');
          return response.data;
    },

    getGastos: async (params: any) => {
          const response = await api.get('/gastos/', { params });
          return response.data;
    },

    getEstadisticasFinanzas: async (params: any) => {
          const response = await api.get('/reportes/estadisticas-finanzas/', { params });
          return response.data;
    },
};

// Servicio de tickets
export const ticketsService = {
    getTickets: async (params: any) => {
          const response = await api.get('/tickets/', { params });
          return response.data;
    },

    getTicket: async (id: number) => {
          const response = await api.get(`/tickets/${id}/`);
          return response.data;
    },

    createTicket: async (data: any) => {
          const response = await api.post('/tickets/', data);
          return response.data;
    },

    updateTicket: async (id: number, data: any) => {
          const response = await api.put(`/tickets/${id}/`, data);
          return response.data;
    },
};

// Servicio del sistema
export const sistemaService = {
    getRouters: async (params?: any) => {
          const response = await api.get('/routers/', { params });
          return response.data;
    },

    getPlanesInternet: async (params?: any) => {
          const response = await api.get('/planes/', { params });
          return response.data;
    },

    getZonas: async () => {
          const response = await api.get('/zonas/');
          return response.data;
    },

    getStaff: async () => {
          const response = await api.get('/staff/');
          return response.data;
    },
};

// Servicio de almacen
export const almacenService = {
    getDashboard: async () => {
          const response = await api.get('/almacen/dashboard/');
          return response.data;
    },

    getDispositivos: async (params?: any) => {
          const response = await api.get('/almacen/dispositivos/', { params });
          return response.data;
    },

    getStock: async () => {
          const response = await api.get('/almacen/stock/');
          return response.data;
    },
};

// Servicio de autenticacion
export const authService = {
    login: async (email: string, password: string) => {
          const response = await api.post('/auth/login/', { email, password });
          return response.data;
    },

    me: async () => {
          const response = await api.get('/auth/me/');
          return response.data;
    },

    logout: () => {
          delete api.defaults.headers.common['Authorization'];
    },

    setAuthToken: (token: string) => {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
};
