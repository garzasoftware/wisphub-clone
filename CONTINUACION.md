# Documento de Continuacion - WispHub Clone

> Estado del proyecto. Ultima actualizacion: 2026-06-19 (sesion nocturna automatica).

## Objetivo

Plataforma clon de WispHub (gestion para ISPs). Frontend React + Vite + TypeScript + Tailwind + react-router + @tanstack/react-query + recharts + react-icons/fi. Backend Node.js/Express.

## ESTADO ACTUAL: paginas del frontend COMPLETAS

Se crearon las 27 paginas que faltaban. Ahora **las 50 rutas/paginas importadas en `frontend/src/App.tsx` tienen su archivo correspondiente (0 faltantes verificado)**.

Paginas creadas en estas sesiones (todas commiteadas a main):
- `pages/Dashboard.tsx` (dashboard principal con recharts)
- Clientes: AvisosEnPantalla, Trafico, NotificacionesPush, ServiciosAdicionales
- Finanzas: BuscarFacturas, PromesasPago, OtrosIngresos, TarjetasCobranza, FormasPago, ListaPagos, FacturasElectronicas, EstadisticasFinanzas, Contabilidad
- Sistema: PlanesTelefonia, SectorialNAP, TareasPeriodicas, Plantillas, AccesoRemoto
- Hotspot (carpeta `pages/Hotspot/`): FichasHotSpot, PlanesHotSpot, PuntosVenta, CorteCaja
- Soporte: EstadisticasSoporte
- Almacen: ListaDispositivos, OtrosArticulos
- Ajustes: MiEmpresa

Ademas se corrigio `App.tsx`: los imports de las 4 paginas Hotspot apuntaban a `./pages/HotSpot/` (S mayuscula) y se ajustaron a `./pages/Hotspot/`; y `MiEmpresa` se ajusto de `./pages/MiEmpresa/MiEmpresa` a `./pages/Ajustes/MiEmpresa`.

## Patron de codigo usado (referencia)

Componentes comunes: `PageHeader` (props: title, subtitle?, icon?, actions?, breadcrumbs?), `DataTable` (props: data, columns, loading, pageSize, pagination; columna = {key,label,sortable?,render?:(value,row,index)}), `EstadoBadge` (prop estado; valores: activo/suspendido/cancelado/pendiente/pagado/abierto/en_progreso/cerrado/resuelto; para arbitrarios usar estado={value as any}), `LoadingSpinner`.
Servicios desde `services/api`: default `api` (axios) + named clientesService, facturasService, ticketsService, sistemaService, almacenService, authService.
Paginas tabla: useState/useEffect + api.get + DataTable. Paginas dashboard/estadisticas: useQuery + recharts + StatCard local + LoadingSpinner.

## PENDIENTES / SIGUIENTES PASOS sugeridos

1. **Probar el build del frontend** (npm install + npm run build dentro de /frontend) para confirmar que compila. Hay datos que dependen de endpoints del backend que quizas aun no existen; las paginas tienen try/catch y degradan a lista/objeto vacio, asi que no deberian romper en runtime, pero conviene validar tipos de TypeScript.
2. **Backend**: solo existe `backend/src/controllers/clienteController.js`. Revisar que cada archivo de `backend/src/routes/*.js` implemente los endpoints que el frontend consume (ej: /clientes/avisos-pantalla, /facturas/promesas-pago, /sistema/sectorial-nap, /hotspot/fichas, /ajustes/mi-empresa, etc.). Crear controladores/handlers faltantes.
3. **Datos de prueba (seeders)** para poder ver las pantallas con contenido.
4. Revisar consistencia de nombres de carpeta (Hotspot vs HotSpot) en todo el repo.

## Metodo para crear/editar archivos en GitHub web (validado)

Sesion logueada como garzasoftware. Editor CodeMirror 6. Se pega el contenido via evento de portapapeles para evitar auto-indentacion:
1. Navegar a `.../new/main?filename=RUTA.tsx` (crear) o `.../edit/main/RUTA.tsx` (editar).
2. Esperar a que exista `document.querySelector('.cm-content')`.
3. Enfocar, simular Cmd+A (keydown metaKey con key 'a') para seleccionar todo, luego despachar un ClipboardEvent 'paste' con DataTransfer text/plain.
4. Hacer click en el boton cuyo texto es "Commit changes..." y luego en el boton "Commit changes" del dialogo (buscar por textContent). Dejar "Commit directly to the main branch".

## Como retomar

Pedir: "lee CONTINUACION.md del repo garzasoftware/wisphub-clone y continua". Verificar primero el build del frontend y luego avanzar con el backend.
