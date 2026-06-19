import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FiGrid, FiUsers, FiTrendingUp, FiServer, FiWifi, FiHeadphones,
    FiPackage, FiUser, FiSettings, FiBriefcase, FiLogOut, FiChevronDown,
    FiChevronRight, FiBell, FiPlus, FiBook, FiStar, FiMap, FiBarChart2,
    FiDollarSign, FiFileText, FiCreditCard, FiShoppingCart, FiTool, FiPhone,
    FiTv, FiMonitor, FiClock, FiZap, FiAward, FiBox
} from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
    isOpen: boolean;
}

interface MenuItem {
    label: string;
    path?: string;
    icon: React.ReactNode;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
        label: 'Dashboard',
        path: '/panel/',
        icon: <FiGrid />
  },
  {
        label: 'Clientes',
        icon: <FiUsers />,
        children: [
          { label: 'Lista Clientes', path: '/panel/clientes', icon: <FiUsers /> },
          { label: 'Buscar Clientes', path: '/panel/clientes/buscar', icon: <FiUsers /> },
          { label: 'Instalaciones', path: '/panel/instalaciones', icon: <FiTool /> },
          { label: 'Avisos en Pantalla', path: '/panel/avisos-pantalla', icon: <FiMonitor /> },
          { label: 'Trafico', path: '/panel/trafico', icon: <FiBarChart2 /> },
          { label: 'Mapa de Clientes', path: '/panel/mapa-clientes', icon: <FiMap /> },
          { label: 'Estadisticas', path: '/panel/estadisticas-clientes', icon: <FiBarChart2 /> },
          { label: 'Notificaciones Push', icon: <FiBell />, children: [
            { label: 'Lista Dispositivos', path: '/panel/notificaciones/dispositivos', icon: <FiPhone /> },
            { label: 'Mis Dispositivos', path: '/panel/notificaciones/mis-dispositivos', icon: <FiPhone /> },
            { label: 'Panel Notificaciones', path: '/panel/notificaciones/panel', icon: <FiBell /> },
                  ]},
          { label: 'Servicios Adicionales', icon: <FiPlus />, children: [
            { label: 'Telefonia', path: '/panel/servicios-adicionales/telefonia', icon: <FiPhone /> },
            { label: 'Television', path: '/panel/servicios-adicionales/television', icon: <FiTv /> },
                  ]},
              ]
  },
  {
        label: 'Finanzas',
        icon: <FiTrendingUp />,
        children: [
          { label: 'Dashboard', path: '/panel/finanzas', icon: <FiGrid /> },
          { label: 'Pagos pendientes', path: '/panel/finanzas/pagos-pendientes', icon: <FiDollarSign /> },
          { label: 'Facturas', path: '/panel/finanzas/facturas', icon: <FiFileText /> },
          { label: 'Reporte de Pagos', path: '/panel/finanzas/reporte-pagos', icon: <FiBarChart2 /> },
          { label: 'Buscar Facturas', path: '/panel/finanzas/buscar-facturas', icon: <FiFileText /> },
          { label: 'Promesas de Pago', path: '/panel/finanzas/promesas-pago', icon: <FiClock /> },
          { label: 'Otros Ingresos', icon: <FiDollarSign />, children: [
            { label: 'Clientes', path: '/panel/finanzas/otros-ingresos/clientes', icon: <FiUsers /> },
            { label: 'Otros', path: '/panel/finanzas/otros-ingresos/otros', icon: <FiPlus /> },
                  ]},
          { label: 'Gastos', path: '/panel/finanzas/gastos', icon: <FiShoppingCart /> },
          { label: 'Estadisticas', icon: <FiBarChart2 />, children: [
            { label: 'Ingresos por Zonas', path: '/panel/finanzas/estadisticas/zonas', icon: <FiMap /> },
            { label: 'Gastos', path: '/panel/finanzas/estadisticas/gastos', icon: <FiShoppingCart /> },
            { label: 'Rango de Fechas', path: '/panel/finanzas/estadisticas/fechas', icon: <FiClock /> },
                  ]},
          { label: 'Tarjetas Cobranza', path: '/panel/finanzas/tarjetas-cobranza', icon: <FiCreditCard /> },
          { label: 'Contabilidad', icon: <FiFileText />, children: [
            { label: 'Resumen', path: '/panel/finanzas/contabilidad', icon: <FiFileText /> },
                  ]},
          { label: 'Formas de Pagos', path: '/panel/finanzas/formas-pago', icon: <FiCreditCard /> },
          { label: 'Lista Pagos', path: '/panel/finanzas/lista-pagos', icon: <FiFileText /> },
          { label: 'Facturas Electronicas', icon: <FiFileText />, children: [
            { label: 'Configuracion', path: '/panel/finanzas/facturas-electronicas', icon: <FiSettings /> },
                  ]},
              ]
  },
  {
        label: 'Sistema',
        icon: <FiServer />,
        children: [
          { label: 'Router', path: '/panel/sistema/routers', icon: <FiServer /> },
          { label: 'Plan de Internet', path: '/panel/sistema/planes-internet', icon: <FiWifi /> },
          { label: 'Plan de Telefonia y TV', path: '/panel/sistema/planes-telefonia', icon: <FiPhone /> },
          { label: 'Zonas', path: '/panel/sistema/zonas', icon: <FiMap /> },
          { label: 'Sectorial/Nodo/NAP', path: '/panel/sistema/sectorial-nap', icon: <FiZap /> },
          { label: 'Tareas Periodicas', path: '/panel/sistema/tareas-periodicas', icon: <FiClock /> },
          { label: 'Plantillas', path: '/panel/sistema/plantillas', icon: <FiFileText /> },
          { label: 'Acceso remoto VPN', path: '/panel/sistema/acceso-remoto', icon: <FiServer /> },
              ]
  },
  {
        label: 'Fichas HotSpot',
        icon: <FiWifi />,
        children: [
          { label: 'Routers', path: '/panel/hotspot', icon: <FiServer /> },
          { label: 'Lista Planes/Prefijos', path: '/panel/hotspot/planes', icon: <FiFileText /> },
          { label: 'Crear Fichas', path: '/panel/hotspot/crear', icon: <FiPlus /> },
          { label: 'Puntos de Venta', path: '/panel/hotspot/puntos-venta', icon: <FiShoppingCart /> },
          { label: 'Corte de Caja General', path: '/panel/hotspot/corte-caja', icon: <FiDollarSign /> },
              ]
  },
  {
        label: 'Soporte Tecnico',
        icon: <FiHeadphones />,
        children: [
          { label: 'Lista de Tickets', path: '/panel/soporte/tickets', icon: <FiFileText /> },
          { label: 'Nuevos', path: '/panel/soporte/tickets?estado=nuevo', icon: <FiPlus /> },
          { label: 'En Progreso', path: '/panel/soporte/tickets?estado=en-progreso', icon: <FiClock /> },
          { label: 'Cerrados y Resueltos', path: '/panel/soporte/tickets?estado=cerrado', icon: <FiAward /> },
          { label: 'Estadisticas', path: '/panel/soporte/estadisticas', icon: <FiBarChart2 /> },
              ]
  },
  {
        label: 'Almacen',
        icon: <FiPackage />,
        children: [
          { label: 'Dashboard', path: '/panel/almacen', icon: <FiGrid /> },
          { label: 'Stock Dispositivos', path: '/panel/almacen/stock', icon: <FiBox /> },
          { label: 'Lista Dispositivos', path: '/panel/almacen/dispositivos', icon: <FiWifi /> },
          { label: 'Otros Articulos', path: '/panel/almacen/articulos', icon: <FiPackage /> },
          { label: 'Proveedores', path: '/panel/almacen/proveedores', icon: <FiBriefcase /> },
              ]
  },
  { label: 'Staff', path: '/panel/staff', icon: <FiUser /> },
  {
        label: 'Ajustes',
        icon: <FiSettings />,
        children: [
          { label: 'Servidor Correo', path: '/panel/ajustes/correo', icon: <FiFileText /> },
          { label: 'Facturacion', path: '/panel/ajustes/facturacion', icon: <FiDollarSign /> },
          { label: 'Pasarelas de Pago', path: '/panel/ajustes/pasarelas', icon: <FiCreditCard /> },
          { label: 'WhatsApp/SMS', path: '/panel/ajustes/whatsapp', icon: <FiPhone /> },
          { label: 'Google Maps', path: '/panel/ajustes/google-maps', icon: <FiMap /> },
              ]
  },
  { label: 'Mi empresa', path: '/panel/mi-empresa', icon: <FiBriefcase /> },
  { label: 'Manual', path: '/panel/manual', icon: <FiBook /> },
  ];

interface SidebarItemProps {
    item: MenuItem;
    depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const isActive = item.path ? location.pathname === item.path || location.pathname.startsWith(item.path + '/') : false;
    const isParentActive = hasChildren && item.children?.some(child =>
          child.path ? location.pathname.startsWith(child.path) : false
                                                                );

    if (hasChildren) {
          return (
                  <div>
                          <button
                                      onClick={() => setIsOpen(!isOpen)}
                                      className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors
                                                  ${isParentActive ? 'text-green-400 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}
                                                              ${depth > 0 ? 'pl-' + (depth * 4 + 4) : ''}
                                                                        `}
                                    >
                                    <div className="flex items-center gap-3">
                                                <span className="text-lg">{item.icon}</span>span>
                                                <span>{item.label}</span>span>
                                    </div>div>
                            {isOpen || isParentActive ? <FiChevronDown className="text-xs" /> : <FiChevronRight className="text-xs" />}
                          </button>button>
                    {(isOpen || isParentActive) && (
                              <div className="bg-gray-900">
                                {item.children?.map((child, idx) => (
                                              <SidebarItem key={idx} item={child} depth={depth + 1} />
                                            ))}
                              </div>div>
                          )}
                  </div>div>
                );
    }
  
    return (
          <NavLink
                  to={item.path || '#'}
                  className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 text-sm transition-colors
                                    ${isActive ? 'text-white bg-green-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'}
                                            ${depth > 0 ? 'pl-' + (depth * 4 + 4) : ''}
                                                    `
                  }
                >
                <span className="text-lg">{item.icon}</span>span>
                <span>{item.label}</span>span>
          </NavLink>NavLink>
        );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { user, logout } = useAuthStore();
  
    if (!isOpen) return null;
  
    return (
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 flex flex-col z-40 overflow-y-auto">
            {/* Logo */}
                <div className="flex items-center justify-center p-4 border-b border-gray-700">
                        <div className="text-center">
                                  <div className="text-2xl font-bold text-green-500">ISP</div>div>
                                  <div className="text-xs text-gray-400">Manager</div>div>
                        </div>div>
                </div>div>
          
            {/* User info */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                                  <FiUser className="text-white" />
                        </div>div>
                        <div>
                                  <div className="text-white text-sm font-medium">{user?.nombre || 'Administrador'}</div>div>
                                  <div className="text-gray-400 text-xs">{user?.nivel || 'Admin'}</div>div>
                        </div>div>
                </div>div>
          
            {/* Navigation */}
                <nav className="flex-1 py-2">
                  {menuItems.map((item, idx) => (
                      <SidebarItem key={idx} item={item} />
                    ))}
                </nav>nav>
          
            {/* Logout */}
                <button
                          onClick={logout}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 border-t border-gray-700 transition-colors"
                        >
                        <FiLogOut />
                        <span className="text-sm">Cerrar sesion</span>span>
                </button>button>
          </div>div>
        );
};

export default Sidebar;</div>
