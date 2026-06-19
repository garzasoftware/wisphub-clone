import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthStore } from './store/authStore';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages - Dashboard
import Dashboard from './pages/Dashboard';

// Pages - Clientes
import ListaClientes from './pages/Clientes/ListaClientes';
import BuscarClientes from './pages/Clientes/BuscarClientes';
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NuevoCliente from './pages/Clientes/NuevoCliente';
import Instalaciones from './pages/Clientes/Instalaciones';
import AvisosEnPantalla from './pages/Clientes/AvisosEnPantalla';
import Trafico from './pages/Clientes/Trafico';
import MapaClientes from './pages/Clientes/MapaClientes';
import EstadisticasClientes from './pages/Clientes/EstadisticasClientes';
import NotificacionesPush from './pages/Clientes/NotificacionesPush';
import ServiciosAdicionales from './pages/Clientes/ServiciosAdicionales';

// Pages - Finanzas
import DashboardFinanzas from './pages/Finanzas/DashboardFinanzas';
import PagosPendientes from './pages/Finanzas/PagosPendientes';
import Facturas from './pages/Finanzas/Facturas';
import ReportePagos from './pages/Finanzas/ReportePagos';
import BuscarFacturas from './pages/Finanzas/BuscarFacturas';
import PromesasPago from './pages/Finanzas/PromesasPago';
import OtrosIngresos from './pages/Finanzas/OtrosIngresos';
import Gastos from './pages/Finanzas/Gastos';
import EstadisticasFinanzas from './pages/Finanzas/EstadisticasFinanzas';
import TarjetasCobranza from './pages/Finanzas/TarjetasCobranza';
import Contabilidad from './pages/Finanzas/Contabilidad';
import FormasPago from './pages/Finanzas/FormasPago';
import ListaPagos from './pages/Finanzas/ListaPagos';
import FacturasElectronicas from './pages/Finanzas/FacturasElectronicas';

// Pages - Sistema
import Routers from './pages/Sistema/Routers';
import PlanesInternet from './pages/Sistema/PlanesInternet';
import PlanesTelefonia from './pages/Sistema/PlanesTelefonia';
import Zonas from './pages/Sistema/Zonas';
import SectorialNAP from './pages/Sistema/SectorialNAP';
import TareasPeriodicas from './pages/Sistema/TareasPeriodicas';
import Plantillas from './pages/Sistema/Plantillas';
import AccesoRemoto from './pages/Sistema/AccesoRemoto';

// Pages - Fichas HotSpot
import FichasHotSpot from './pages/HotSpot/FichasHotSpot';
import PlanesHotSpot from './pages/HotSpot/PlanesHotSpot';
import PuntosVenta from './pages/HotSpot/PuntosVenta';
import CorteCaja from './pages/HotSpot/CorteCaja';

// Pages - Soporte Tecnico
import ListaTickets from './pages/Soporte/ListaTickets';
import DetalleTicket from './pages/Soporte/DetalleTicket';
import EstadisticasSoporte from './pages/Soporte/EstadisticasSoporte';

// Pages - Almacen
import DashboardAlmacen from './pages/Almacen/DashboardAlmacen';
import StockDispositivos from './pages/Almacen/StockDispositivos';
import ListaDispositivos from './pages/Almacen/ListaDispositivos';
import OtrosArticulos from './pages/Almacen/OtrosArticulos';
import Proveedores from './pages/Almacen/Proveedores';

// Pages - Staff & Config
import Staff from './pages/Staff/Staff';
import Ajustes from './pages/Ajustes/Ajustes';
import MiEmpresa from './pages/MiEmpresa/MiEmpresa';

// Auth
import Login from './pages/Auth/Login';

const queryClient = new QueryClient({
    defaultOptions: {
          queries: {
                  retry: 1,
                  staleTime: 5 * 60 * 1000, // 5 minutos
          },
    },
});

function App() {
    const { isAuthenticated } = useAuthStore();

  return (
        <QueryClientProvider client={queryClient}>
                <Router>
                        <Routes>
                          {/* Ruta de login */}
                                  <Route
                                                path="/login"
                                                element={isAuthenticated ? <Navigate to="/panel/" replace /> : <Login />}
                                              />
                        
                          {/* Rutas protegidas */}
                                  <Route
                                                path="/panel"
                                                element={
                                                                <ProtectedRoute>
                                                                                <Layout />
                                                                </ProtectedRoute>ProtectedRoute>
                                    }
                                            >
                                    {/* Dashboard */}
                                              <Route index element={<Dashboard />} />
                                              <Route path="" element={<Dashboard />} />
                                  
                                    {/* Clientes */}
                                              <Route path="clientes">
                                                            <Route index element={<ListaClientes />} />
                                                            <Route path="buscar" element={<BuscarClientes />} />
                                                            <Route path=":id" element={<DetalleCliente />} />
                                                            <Route path="nuevo" element={<NuevoCliente />} />
                                              </Route>Route>
                                              <Route path="instalaciones" element={<Instalaciones />} />
                                              <Route path="avisos-pantalla" element={<AvisosEnPantalla />} />
                                              <Route path="trafico" element={<Trafico />} />
                                              <Route path="mapa-clientes" element={<MapaClientes />} />
                                              <Route path="estadisticas-clientes" element={<EstadisticasClientes />} />
                                              <Route path="notificaciones" element={<NotificacionesPush />} />
                                              <Route path="servicios-adicionales" element={<ServiciosAdicionales />} />
                                  
                                    {/* Finanzas */}
                                              <Route path="finanzas">
                                                            <Route index element={<DashboardFinanzas />} />
                                                            <Route path="pagos-pendientes" element={<PagosPendientes />} />
                                                            <Route path="facturas" element={<Facturas />} />
                                                            <Route path="reporte-pagos" element={<ReportePagos />} />
                                                            <Route path="buscar-facturas" element={<BuscarFacturas />} />
                                                            <Route path="promesas-pago" element={<PromesasPago />} />
                                                            <Route path="otros-ingresos" element={<OtrosIngresos />} />
                                                            <Route path="gastos" element={<Gastos />} />
                                                            <Route path="estadisticas" element={<EstadisticasFinanzas />} />
                                                            <Route path="tarjetas-cobranza" element={<TarjetasCobranza />} />
                                                            <Route path="contabilidad" element={<Contabilidad />} />
                                                            <Route path="formas-pago" element={<FormasPago />} />
                                                            <Route path="lista-pagos" element={<ListaPagos />} />
                                                            <Route path="facturas-electronicas" element={<FacturasElectronicas />} />
                                              </Route>Route>
                                  
                                    {/* Sistema */}
                                              <Route path="sistema">
                                                            <Route path="routers" element={<Routers />} />
                                                            <Route path="planes-internet" element={<PlanesInternet />} />
                                                            <Route path="planes-telefonia" element={<PlanesTelefonia />} />
                                                            <Route path="zonas" element={<Zonas />} />
                                                            <Route path="sectorial-nap" element={<SectorialNAP />} />
                                                            <Route path="tareas-periodicas" element={<TareasPeriodicas />} />
                                                            <Route path="plantillas" element={<Plantillas />} />
                                                            <Route path="acceso-remoto" element={<AccesoRemoto />} />
                                              </Route>Route>
                                  
                                    {/* HotSpot */}
                                              <Route path="hotspot">
                                                            <Route index element={<FichasHotSpot />} />
                                                            <Route path="planes" element={<PlanesHotSpot />} />
                                                            <Route path="puntos-venta" element={<PuntosVenta />} />
                                                            <Route path="corte-caja" element={<CorteCaja />} />
                                              </Route>Route>
                                  
                                    {/* Soporte Tecnico */}
                                              <Route path="soporte">
                                                            <Route index element={<ListaTickets />} />
                                                            <Route path="tickets" element={<ListaTickets />} />
                                                            <Route path="tickets/:id" element={<DetalleTicket />} />
                                                            <Route path="estadisticas" element={<EstadisticasSoporte />} />
                                              </Route>Route>
                                  
                                    {/* Almacen */}
                                              <Route path="almacen">
                                                            <Route index element={<DashboardAlmacen />} />
                                                            <Route path="stock" element={<StockDispositivos />} />
                                                            <Route path="dispositivos" element={<ListaDispositivos />} />
                                                            <Route path="articulos" element={<OtrosArticulos />} />
                                                            <Route path="proveedores" element={<Proveedores />} />
                                              </Route>Route>
                                  
                                    {/* Staff y configuracion */}
                                              <Route path="staff" element={<Staff />} />
                                              <Route path="ajustes" element={<Ajustes />} />
                                              <Route path="mi-empresa" element={<MiEmpresa />} />
                                  </Route>Route>
                        
                          {/* Redireccion por defecto */}
                                  <Route path="/" element={<Navigate to="/panel/" replace />} />
                                  <Route path="*" element={<Navigate to="/panel/" replace />} />
                        </Routes>Routes>
                
                        <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                  />
                </Router>Router>
        </QueryClientProvider>QueryClientProvider>
      );
}

export default App;</Router>
