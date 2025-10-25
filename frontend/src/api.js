export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
export const getKPIs = () => fetch(`${API_BASE}/api/kpis`).then(r=>r.json());
export const getLogs = () => fetch(`${API_BASE}/api/logs`).then(r=>r.json());
export const getBot  = () => fetch(`${API_BASE}/api/bot`).then(r=>r.json());
export const setBot  = (enabled) => fetch(`${API_BASE}/api/bot`, {
  method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({enabled})
}).then(r=>r.json());
export const simulate = (count=20) => fetch(`${API_BASE}/api/simulate`, {
  method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({count})
}).then(r=>r.json());
