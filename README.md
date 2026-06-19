# WispHub Clone - Plataforma ISP

> Plataforma de gestión completa para Proveedores de Servicios de Internet (ISP) - Réplica funcional de WispHub
>
> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
> [![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
> [![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
>
> ## 🚀 Descripción
>
> Sistema de gestión integral para ISPs que replica las funcionalidades de WispHub, incluyendo gestión de clientes, facturación, soporte técnico, almacén, y más. Construido con React (frontend) y Node.js/Express (backend).
>
> ## 📦 Estructura del Proyecto
>
> ```
> wisphub-clone/
> ├── frontend/          # React + Vite + TailwindCSS
> │   ├── src/
> │   │   ├── components/    # Componentes reutilizables
> │   │   ├── pages/         # Páginas de la aplicación
> │   │   ├── hooks/         # Custom hooks
> │   │   ├── services/      # Servicios API
> │   │   ├── store/         # Estado global (Zustand)
> │   │   └── utils/         # Utilidades
> │   └── package.json
> ├── backend/           # Node.js + Express + PostgreSQL
> │   ├── src/
> │   │   ├── controllers/   # Controladores
> │   │   ├── models/        # Modelos de datos
> │   │   ├── routes/        # Rutas API
> │   │   ├── middleware/     # Middleware
> │   │   ├── services/      # Lógica de negocio
> │   │   └── utils/         # Utilidades
> │   └── package.json
> └── docker-compose.yml
> ```
>
> ## ✨ Funcionalidades
>
> ### 👥 Gestión de Clientes
> - Lista de clientes con filtros avanzados
> - - Búsqueda por múltiples criterios (zona, estado, router, plan, técnico)
>   - - Instalaciones y pre-instalaciones
>     - - Mapa de clientes (Google Maps)
>       - - Estadísticas de clientes (activos, cancelados, suspendidos)
>         - - Avisos en pantalla (portal cautivo)
>           - - Monitoreo de tráfico por cliente
>            
>             - ### 💰 Finanzas
>             - - Dashboard financiero (ingresos diarios, pendientes, mensuales)
>               - - Gestión de pagos pendientes
>                 - - Facturación completa
>                   - - Reporte de pagos
>                     - - Promesas de pago
>                       - - Otros ingresos (por cliente y otros)
>                         - - Control de gastos
>                           - - Estadísticas financieras por zonas
>                             - - Tarjetas de cobranza
>                               - - Contabilidad
>                                 - - Múltiples formas de pago
>                                   - - Suscripciones y pasarelas de pago
>                                     - - Facturación electrónica
>                                       - - Conciliación de clientes
>                                        
>                                         - ### 🌐 Sistema / Red
>                                         - - Gestión de routers MikroTik
>                                           - - Planes de Internet (Queue, PCQ, HotSpot, PPPoE)
>                                             - - Planes de Telefonía y Televisión
>                                               - - Zonas de servicio
>                                                 - - Sectorial/Nodo/NAP
>                                                   - - Tareas periódicas automatizadas
>                                                     - - Plantillas de configuración
>                                                       - - Acceso remoto VPN
>                                                         - - AdminOLT (fibra óptica)
>                                                           - - Subdominios
>                                                             - - DirectorioISP
>                                                              
>                                                               - ### 📶 Fichas HotSpot
>                                                               - - Gestión de routers HotSpot
>                                                                 - - Planes y prefijos
>                                                                   - - Generación de fichas
>                                                                     - - Puntos de venta
>                                                                       - - Corte de caja general
>                                                                        
>                                                                         - ### 🎫 Soporte Técnico
>                                                                         - - Sistema de tickets (Nuevo, En Progreso, Cerrado/Resuelto)
>                                                                           - - Asignación a técnicos
>                                                                             - - Historial de tickets por cliente
>                                                                               - - Estadísticas de soporte
>                                                                                 - - Búsqueda avanzada de tickets
>                                                                                  
>                                                                                   - ### 📦 Almacén
>                                                                                   - - Dashboard de inventario
>                                                                                     - - Stock de dispositivos de red
>                                                                                       - - Lista de dispositivos (disponibles, ocupados, asignados)
>                                                                                         - - Otros artículos y servicios
>                                                                                           - - Gestión de proveedores
>                                                                                             - - Sucursales
>                                                                                               - - Asignación de artículos a staff
>                                                                                                 - - Log de movimientos
>                                                                                                  
>                                                                                                   - ### 👨‍💼 Staff
>                                                                                                   - - Gestión de personal (Administradores y Técnicos)
>                                                                                                     - - Control de accesos y permisos
>                                                                                                       - - Último acceso por usuario
>                                                                                                        
>                                                                                                         - ### ⚙️ Ajustes
>                                                                                                         - - Servidor de correo (SMTP)
>                                                                                                           - - Configuración de facturación
>                                                                                                             - - Facturación electrónica
>                                                                                                               - - Pasarelas de pago
>                                                                                                                 - - WhatsApp/SMS
>                                                                                                                   - - Google Maps API
>                                                                                                                     - - Importación de clientes desde Excel
>                                                                                                                       - - Columnas visibles personalizables
>                                                                                                                        
>                                                                                                                         - ### 🔔 Notificaciones Push
>                                                                                                                         - - Lista de dispositivos registrados
>                                                                                                                           - - Panel de notificaciones (leídas/no leídas)
>                                                                                                                             - - Envío masivo de notificaciones
>                                                                                                                              
>                                                                                                                               - ### 📡 Servicios Adicionales
>                                                                                                                               - - Telefonía (VoIP)
>                                                                                                                                 - - Televisión (IPTV)
>                                                                                                                                  
>                                                                                                                                   - ## 🛠️ Stack Tecnológico
>                                                                                                                                  
>                                                                                                                                   - ### Frontend
>                                                                                                                                   - - **React 18** - Framework UI
>                                                                                                                                     - - **Vite** - Build tool
> - **TailwindCSS** - Estilos
> - - **React Router v6** - Enrutamiento
>   - - **Zustand** - Estado global
>     - - **React Query (TanStack)** - Data fetching y cache
>       - - **Recharts** - Gráficas y estadísticas
>         - - **React Table** - Tablas con filtros
>           - - **React Leaflet / Google Maps** - Mapas
>             - - **Axios** - Cliente HTTP
>              
>               - ### Backend
>               - - **Node.js 18+** - Runtime
>                 - - **Express.js** - Framework web
>                   - - **PostgreSQL** - Base de datos principal
>                     - - **Redis** - Cache y sesiones
>                       - - **JWT** - Autenticación
>                         - - **Sequelize** - ORM
>                           - - **Multer** - Carga de archivos
>                             - - **Nodemailer** - Envío de correos
>                               - - **Socket.io** - Tiempo real (notificaciones)
>                                 - - **Bull** - Cola de trabajos (tareas periódicas)
>                                  
>                                   - ## 🚀 Instalación y Uso
>                                  
>                                   - ### Prerrequisitos
>                                   - - Node.js 18+
>                                     - - PostgreSQL 14+
> - Redis 6+
> - - Docker (opcional)
>  
>   - ### Con Docker (recomendado)
>   - ```bash
>     git clone https://github.com/garzasoftware/wisphub-clone.git
>     cd wisphub-clone
>     cp .env.example .env
>     # Editar .env con tus configuraciones
>     docker-compose up -d
>     ```
>
> ### Manual
>
> #### Backend
> ```bash
> cd backend
> npm install
> cp .env.example .env
> # Configurar variables de entorno
> npm run migrate
> npm run seed
> npm run dev
> ```
>
> #### Frontend
> ```bash
> cd frontend
> npm install
> cp .env.example .env
> # Configurar VITE_API_URL
> npm run dev
> ```
>
> ## 🔌 API
>
> El backend expone una API RESTful documentada con Swagger disponible en `/api/docs`.
>
> Compatible con la API de WispHub para integración con routers MikroTik.
>
> ### Autenticación
> ```
> Authorization: Api-Key <tu_api_key>
> ```
>
> ### Endpoints principales
> - `GET /api/clientes/` - Listado de clientes
> - - `GET /api/clientes/:id/` - Información del cliente
>   - - `PUT /api/clientes/:id/servicio/` - Editar servicio
>     - - `GET /api/instalaciones/` - Instalaciones y pre-instalaciones
>       - - `POST /api/solicitar-instalacion/` - Solicitar preinstalación
>         - - `GET /api/servicios-adicionales/` - Servicios adicionales
>           - - `GET /api/facturas/` - Listado de facturas
>             - - `GET /api/pagos/` - Pagos pendientes
>               - - `GET /api/tickets/` - Tickets de soporte
>                 - - `GET /api/routers/` - Lista de routers
>                   - - `GET /api/planes-internet/` - Planes de internet
>                     - - `GET /api/zonas/` - Zonas de servicio
>                       - - `GET /api/almacen/` - Inventario
>                        
>                         - ## 🗄️ Base de Datos
>                        
>                         - El proyecto utiliza PostgreSQL con las siguientes entidades principales:
>                        
>                         - - **clientes** - Información de clientes
> - **servicios** - Servicios de internet por cliente
> - - **facturas** - Facturación y pagos
>   - - **tickets** - Soporte técnico
>     - - **routers** - Equipos de red
>       - - **planes_internet** - Planes disponibles
>         - - **zonas** - Zonas de servicio
>           - - **staff** - Personal del ISP
>             - - **almacen** - Inventario de equipos
>               - - **dispositivos_red** - Dispositivos WiFi/OLT
>                
>                 - ## 📸 Capturas
>                
>                 - Ver directorio `/screenshots` para capturas de pantalla de la aplicación.
>                
>                 - ## 🤝 Contribución
>
> 1. Fork el proyecto
> 2. 2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
>    3. 3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
>       4. 4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
>          5. 5. Abre un Pull Request
>            
>             6. ## 📄 Licencia
>            
>             7. MIT License - ver [LICENSE](LICENSE) para detalles.
>            
>             8. ## 👨‍💻 Autor
>
> Desarrollado por **GySIS Telecom** como herramienta de gestión ISP.
>
> ---
> *Nota: Este proyecto es una implementación independiente y no está afiliado oficialmente con WispHub.*
