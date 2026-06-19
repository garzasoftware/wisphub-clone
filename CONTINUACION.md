# Documento de Continuacion - WispHub Clone

> Archivo para retomar el trabajo de construccion de la plataforma en una conversacion nueva.
> Ultima actualizacion: 2026-06-18

## Objetivo general

Estamos construyendo una **plataforma clon de WispHub** (gestion para ISPs) en este repo (`garzasoftware/wisphub-clone`).
Stack: **Frontend** React + Vite + TypeScript + TailwindCSS + react-router + @tanstack/react-query + recharts + react-icons/fi.
**Backend** Node.js/Express con modelos, rutas, migraciones y seeders.

## Estado actual

El `frontend/src/App.tsx` ya declara **50 rutas/paginas** del menu completo (ver Sidebar.tsx), pero faltaban crear varias paginas como archivo (estaban importadas y ruteadas pero sin existir, lo que impide compilar).

Tarea en curso: **crear las paginas faltantes** siguiendo el patron del repo y commitearlas a `main`.

Ya creadas en esta sesion: `frontend/src/pages/Dashboard.tsx` y `frontend/src/pages/Clientes/AvisosEnPantalla.tsx`.

## Paginas que AUN FALTAN crear (25)

- [ ] `frontend/src/pages/Clientes/Trafico.tsx`
- [ ] `frontend/src/pages/Clientes/NotificacionesPush.tsx`
- [ ] `frontend/src/pages/Clientes/ServiciosAdicionales.tsx`
- [ ] `frontend/src/pages/Finanzas/BuscarFacturas.tsx`
- [ ] `frontend/src/pages/Finanzas/PromesasPago.tsx`
- [ ] `frontend/src/pages/Finanzas/OtrosIngresos.tsx`
- [ ] `frontend/src/pages/Finanzas/TarjetasCobranza.tsx`
- [ ] `frontend/src/pages/Finanzas/FormasPago.tsx`
- [ ] `frontend/src/pages/Finanzas/ListaPagos.tsx`
- [ ] `frontend/src/pages/Finanzas/FacturasElectronicas.tsx`
- [ ] `frontend/src/pages/Sistema/PlanesTelefonia.tsx`
- [ ] `frontend/src/pages/Sistema/SectorialNAP.tsx`
- [ ] `frontend/src/pages/Sistema/TareasPeriodicas.tsx`
- [ ] `frontend/src/pages/Sistema/Plantillas.tsx`
- [ ] `frontend/src/pages/Sistema/AccesoRemoto.tsx`
- [ ] `frontend/src/pages/Hotspot/FichasHotSpot.tsx`
- [ ] `frontend/src/pages/Hotspot/PlanesHotSpot.tsx`
- [ ] `frontend/src/pages/Hotspot/PuntosVenta.tsx`
- [ ] `frontend/src/pages/Almacen/ListaDispositivos.tsx`
- [ ] `frontend/src/pages/Almacen/OtrosArticulos.tsx`
- [ ] `frontend/src/pages/Finanzas/EstadisticasFinanzas.tsx`
- [ ] `frontend/src/pages/Soporte/EstadisticasSoporte.tsx`
- [ ] `frontend/src/pages/Finanzas/Contabilidad.tsx`
- [ ] `frontend/src/pages/Hotspot/CorteCaja.tsx`
- [ ] `frontend/src/pages/Ajustes/MiEmpresa.tsx`

> Para validar que estan TODAS: comparar los imports de paginas en `frontend/src/App.tsx` contra los archivos `.tsx` existentes en `frontend/src/pages/`. Los que falten son los pendientes.

## Patron de codigo confirmado (importante para que compile)

Componentes comunes y sus props (NO inventar otras):
- `PageHeader` (default import desde `components/Common/PageHeader`): props `title: string`, `subtitle?`, `icon?` (ReactNode), `actions?: Action[]`, `breadcrumbs?: {label: string; href?: string}[]`.
- `DataTable` (default import desde `components/Common/DataTable`): props `data`, `columns`, `loading`, `pageSize`, `pagination`, `onRowSelectionChange`. Cada columna: `{ key, label, sortable?, render?: (value, row, index) => ReactNode }`.
- `EstadoBadge` (default import desde `components/Common/EstadoBadge`): prop `estado` (valores conocidos: activo, suspendido, cancelado, pendiente, pagado, abierto, en_progreso, cerrado, resuelto) y `size?: 'sm'|'md'`. Para estados arbitrarios usar `estado={value as any}`.
- `LoadingSpinner` (default import).

Servicios API (desde `services/api`): default `api` (axios) con `api.get/post/put/delete`. Named: `clientesService, facturasService, ticketsService, sistemaService, almacenService, authService`.

Paginas tipo TABLA: `useState/useEffect` + `api.get(endpoint)` -> `setItems(res.data?.results || res.data || [])` con try/catch + `PageHeader` + `DataTable`.
Paginas tipo DASHBOARD/ESTADISTICAS: `useQuery` (@tanstack/react-query) + `recharts` (BarChart/PieChart/ResponsiveContainer) + tarjetas StatCard locales + `LoadingSpinner` mientras carga.
Iconos: solo de `react-icons/fi` (Fi...). Indentacion 2 espacios.

## Metodo de trabajo VALIDADO para crear archivos en GitHub web

La sesion esta logueada como `garzasoftware`. El editor es CodeMirror 6. Para evitar problemas de auto-indentacion al escribir, se PEGA el contenido via evento de portapapeles:

1. Navegar a: `https://github.com/garzasoftware/wisphub-clone/new/main?filename=RUTA/DEL/ARCHIVO.tsx` (el filename se pre-rellena solo).
2. ESPERAR a que cargue el editor (que exista `document.querySelector('.cm-content')`) antes de pegar. (Fallaba si se pegaba inmediato tras navegar.)
3. Pegar con esta funcion JS:
```js
async function setEditor(text){
  const el = document.querySelector('.cm-content');
  el.focus();
  el.dispatchEvent(new KeyboardEvent('keydown',{key:'a',code:'KeyA',keyCode:65,which:65,metaKey:true,bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,80));
  const dt = new DataTransfer();
  dt.setData('text/plain', text);
  el.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,150));
}
```
4. Click en boton "Commit changes..." (arriba derecha) -> en el dialogo dejar "Commit directly to the main branch" -> click "Commit changes".

Nota: al leer archivos del repo via JS puede aparecer "[BLOCKED: Cookie/query string data]" con cierto contenido; conviene leer en fragmentos pequenos o solo estructura (tags, props), o usar raw.githubusercontent.com.

## Como retomar en una conversacion nueva

1. Pedir al asistente que lea este archivo (`CONTINUACION.md`) y `frontend/src/App.tsx` + `frontend/src/components/Layout/Sidebar.tsx`.
2. Calcular las paginas faltantes (imports de App.tsx que no existen como archivo).
3. Crear cada pagina faltante con el patron de arriba y commitearla a main, una por una.
4. Al terminar las 50 paginas, revisar tambien el backend: solo existe `clienteController.js`; el resto de la logica esta en los archivos de `routes/`. Verificar consistencia de endpoints frontend/backend.

## Siguiente paso inmediato

Crear `frontend/src/pages/Clientes/Trafico.tsx` (primer pendiente de la lista) y seguir el orden de la lista.
