# Backend (Node + Express + Twilio)

- `/voice/incoming` — Twilio webhook (TwiML) running a 7-question flow.
- `/api/kpis` — KPIs for dashboard.
- `/api/logs` — call logs (latest first).
- `/api/simulate` — generate demo calls.
- `/api/bot` — get/toggle bot on/off.

Edit questions & rules in `dialog/flow.js`.
