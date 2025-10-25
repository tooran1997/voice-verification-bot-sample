# 🎙️ Tooran AI Voice Verification Bot

A complete **AI-powered voice qualification and transfer system** — built with **Node.js**, **Express**, and **Vite (React)** for educational and portfolio purposes.

This project simulates how real-world call centers use voice bots to **analyze, qualify, and transfer** leads in real time — with a live analytics dashboard.

---

## ⚙️ Features

✅ Real-time dashboard with KPIs (Total Calls, Qualified, Transferred)  
✅ Simulated AI call flow and qualification logic  
✅ Voice verification simulation  
✅ Event logging and live call updates  
✅ Backend (API) + Frontend (UI) integration  
✅ Docker-ready for deployment  
✅ Easily extendable with Twilio or real AI voice APIs  

---

## 🧠 Tech Stack

- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express  
- **Runtime Environment:** Docker  
- **State & Data:** JSON (local simulation)  
- **Deployment:** Vercel (Frontend), Render / Railway (Backend)

---

## 🗂️ Project Structure

```
voice-verification-bot-sample/
│
├── backend/
│   ├── server.js
│   ├── dialog/
│   │   └── flow.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Dashboard.jsx
│   │   ├── KPIcard.jsx
│   │   ├── Simulator.jsx
│   │   ├── api.js
│   │   └── utils.js
│   ├── public/
│   ├── index.html
│   └── package.json
│
└── docker-compose.yml
```

---

## 🚀 How to Run Locally

```bash
# Clone this repository
git clone https://github.com/tooran1997/voice-verification-bot-sample.git

# Go into backend and install dependencies
cd backend
npm install

# Start backend server
node server.js

# Open another terminal and start frontend
cd ../frontend
npm install
npm run dev
```

Your app will be available at **http://localhost:5173/** 🎯

---

## 🖼️ Live Dashboard Preview

*(Replace this with your real Vercel link later)*  
👉 https://voice-verification-bot.vercel.app/

---

## 🧩 Future Improvements

- 🔊 Add real Twilio voice call integration  
- 📊 Store logs in MongoDB or Firebase  
- 🧠 Integrate OpenAI API for smarter lead qualification  
- 🌐 Multi-language voice recognition  

---

## ⚠️ Disclaimer

This project is for **educational and portfolio** purposes only.  
No real telephony or user data is processed.  

---

## 🇮🇷 توضیحات فارسی

پروژه‌ی **بات تأیید هویت صوتی** (Voice Verification Bot) یک نمونه‌کار آموزشی است که شامل **بک‌اند (Node.js)** و **فرانت‌اند (React + Vite)** می‌باشد.  
این برنامه تماس‌های شبیه‌سازی‌شده را تحلیل می‌کند، امتیاز می‌دهد و نتیجه را در داشبورد زنده نمایش می‌دهد.

### ویژگی‌ها:
- داشبورد زنده با آمار تماس‌ها  
- شبیه‌سازی تماس و ارزیابی صوتی  
- اتصال آسان به Twilio یا سایر APIها  
- محیط اجرا با Docker  
- قابل دیپلوی روی Vercel یا Render  

👩‍💻 Developed by [**Tooran (tooran1997)**](https://github.com/tooran1997)
