import React, { useState } from 'react'
import { simulate } from './api'
export default function Simulator(){
  const [count, setCount] = useState(30)
  const [busy, setBusy] = useState(false)
  async function run(){ setBusy(true); await simulate(count); setBusy(false) }
  return (
    <div className="card" style={{marginTop:12}}>
      <div className="sectionTitle">Simulator</div>
      <div className="row">
        <input type="range" min="1" max="200" value={count}
          onChange={e=>setCount(Number(e.target.value))}
          style={{width:280}}/>
        <div className="badge">count: {count}</div>
        <button className="btn" onClick={run} disabled={busy}>
          {busy?'Running…':'Simulate Calls'}
        </button>
      </div>
    </div>
  )
}
