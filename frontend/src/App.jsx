// frontend/src/App.jsx
import React from 'react'
import Dashboard from './Dashboard.jsx'
import Simulator from './Simulator.jsx'

export default function App() {
  return (
    <div className="container">
      {/* Header / Brand */}
      <div className="nav">
        <img className="logo" src="/vvb.svg" alt="logo" />
        <div className="brand">Tooran AI Solutions</div>
      </div>

      {/* Hero */}
      <div className="hero">
        <div>
          <div className="pill">AI Voice • Qualification • Warm Transfer</div>
          <div className="title">AI Voice Verification Dashboard — By Tooran</div>
          <div className="subtitle">
            Developed by <b>Tooran</b> — an AI-powered voice verification bot with live KPIs,
            qualification analytics, event logging, and a built-in call simulator for portfolio demos.
          </div>
        </div>
        <div className="row">
          <a className="btn" href="#" onClick={(e)=>e.preventDefault()}>Live Demo</a>
          <span className="badge">v1.1</span>
        </div>
      </div>

      {/* Main Cards & Table */}
      <Dashboard />

      {/* Simulator */}
      <Simulator />

      {/* Footer */}
      <div className="footer">
        © 2025 · Built for portfolio demos · Edit questions in <code>backend/dialog/flow.js</code>
      </div>
    </div>
  );
}
