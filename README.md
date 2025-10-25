# Voice Verification Bot — Sample (Twilio + Node + React)

A portfolio-ready sample of a **voice qualification bot** with:
- **Twilio Voice** webhook that runs a 7‑question flow, then does a **warm transfer** if qualified.
- **React dashboard** for KPIs and logs (+ a built-in **Simulator** so you can demo without Twilio).
- Clean, minimal code with **Docker Compose** or local `npm` scripts.

> This is a minimal showcase. It works locally (simulator) and can connect to Twilio with a phone number if you add your credentials.

---

## Quick Start (Local, Simulator)
1) **Backend**
```bash
cd backend
cp .env.example .env   # optional, only needed for Twilio
npm i
npm run dev
```
2) **Frontend**
```bash
cd ../frontend
npm i
npm run dev
```
3) Open the dashboard URL printed by Vite (e.g., http://localhost:5173). Click **“Simulate Calls”** to see KPIs and logs update.

---

## Twilio Setup (Real Calls)
1) Create a Twilio account and buy a Voice‑enabled number.
2) Expose your local backend with `ngrok`:
```bash
ngrok http 3000
```
3) In Twilio Console → Phone Numbers → Voice → **A CALL COMES IN** set to **Webhook** with:
```
https://YOUR-NGROK-ID.ngrok.io/voice/incoming
```
4) Put your Twilio credentials and a target transfer number in `backend/.env`:
```
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
CLOSER_NUMBER=+11234567890
```
5) Call your Twilio number. The bot asks 7 questions and, if qualified, performs a warm transfer to `CLOSER_NUMBER`.

---

## Project Structure
```
voice-verification-bot-sample/
  backend/
    server.js
    dialog/flow.js
    package.json
    .env.example
    README.md
  frontend/
    index.html
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      api.js
      Dashboard.jsx
      Simulator.jsx
  docker-compose.yml
  README.md (this file)
```

---

## Notes
- State is stored **in‑memory** (good for demos). Swap for Redis/DB for production.
- The dialog is an **FSM** in `dialog/flow.js`. Edit questions/logic easily.
- Warm transfer uses TwiML `<Dial>`; on trials, Twilio may require verified numbers.
- Feel free to rebrand UI and README for your portfolio.
