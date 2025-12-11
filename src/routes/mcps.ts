import { Hono } from 'hono';
import type { MCPStoreResponse } from '../types/mcps';

// Import estático del catálogo
import mcpsDataJson from '../data/mcps.json';

const mcps = new Hono();

// GET /mcps.json → listado completo
mcps.get('/mcps.json', (c) => {
  const data = mcpsDataJson as MCPStoreResponse;

  // Añadir headers de cache (1 hora)
  c.header('Cache-Control', 'public, max-age=3600');
  c.header('Content-Type', 'application/json');

  return c.json(data);
});

// GET /mcps/:id → servidor concreto
mcps.get('/mcps/:id', (c) => {
  const id = c.req.param('id');
  const data = mcpsDataJson as MCPStoreResponse;

  const server = data.servers.find((s) => s.id === id);

  if (!server) {
    return c.json({ error: 'MCP server not found', id }, 404);
  }

  // Añadir headers de cache (1 hora)
  c.header('Cache-Control', 'public, max-age=3600');
  c.header('Content-Type', 'application/json');

  return c.json(server);
});

// GET /mcps → alias para /mcps.json (por conveniencia)
mcps.get('/mcps', (c) => {
  return c.redirect('/api/mcps.json');
});

export default mcps;
