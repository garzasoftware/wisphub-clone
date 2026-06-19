const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

let planesQueue = [
  { id:1, nombre:'Plan 5 Mbps', precio:299, descarga:5, subida:2, tipo:'queue', activo:true },
    { id:2, nombre:'Plan 10 Mbps', precio:399, descarga:10, subida:5, tipo:'queue', activo:true },
      { id:3, nombre:'Plan 20 Mbps', precio:499, descarga:20, subida:10, tipo:'queue', activo:true },
        { id:4, nombre:'Plan 50 Mbps', precio:799, descarga:50, subida:25, tipo:'queue', activo:true },
          { id:5, nombre:'Plan 100 Mbps', precio:999, descarga:100, subida:50, tipo:'queue', activo:true }
          ];
          let planesPCQ = [
            { id:10, nombre:'PCQ Basico', precio:199, descarga:3, subida:1, tipo:'pcq', activo:true },
              { id:11, nombre:'PCQ Estandar', precio:299, descarga:5, subida:2, tipo:'pcq', activo:true }
              ];
              let planesHotspot = [
                { id:20, nombre:'HotSpot 1h', precio:10, duracion_horas:1, tipo:'hotspot', activo:true },
                  { id:21, nombre:'HotSpot 1 dia', precio:50, duracion_horas:24, tipo:'hotspot', activo:true }
                  ];
                  let planesPPPoE = [
                    { id:30, nombre:'PPPoE 20 Mbps', precio:450, descarga:20, subida:10, tipo:'pppoe', activo:true },
                      { id:31, nombre:'PPPoE 50 Mbps', precio:650, descarga:50, subida:25, tipo:'pppoe', activo:true }
                      ];
                      let nextId = 100;

                      router.get('/', authMiddleware, (req, res) => {
                        const { tipo } = req.query;
                          let all = [...planesQueue, ...planesPCQ, ...planesHotspot, ...planesPPPoE];
                            if (tipo) all = all.filter(p => p.tipo === tipo);
                              res.json({ count: all.length, rows: all });
                              });

                              router.get('/:id', authMiddleware, (req, res) => {
                                const all = [...planesQueue, ...planesPCQ, ...planesHotspot, ...planesPPPoE];
                                  const p = all.find(p => p.id === +req.params.id);
                                    if (!p) return res.status(404).json({ error: 'Plan no encontrado' });
                                      res.json(p);
                                      });

                                      router.post('/', authMiddleware, (req, res) => {
                                        const plan = { id: nextId++, ...req.body, activo: true };
                                          switch (req.body.tipo) {
                                              case 'pcq': planesPCQ.push(plan); break;
                                                  case 'hotspot': planesHotspot.push(plan); break;
                                                      case 'pppoe': planesPPPoE.push(plan); break;
                                                          default: planesQueue.push(plan);
                                                            }
                                                              res.status(201).json(plan);
                                                              });

                                                              router.put('/:id', authMiddleware, (req, res) => {
                                                                const listas = [planesQueue, planesPCQ, planesHotspot, planesPPPoE];
                                                                  for (const lista of listas) {
                                                                      const idx = lista.findIndex(p => p.id === +req.params.id);
                                                                          if (idx !== -1) {
                                                                                lista[idx] = { ...lista[idx], ...req.body, id: lista[idx].id };
                                                                                      return res.json(lista[idx]);
                                                                                          }
                                                                                            }
                                                                                              res.status(404).json({ error: 'Plan no encontrado' });
                                                                                              });

                                                                                              module.exports = router;
