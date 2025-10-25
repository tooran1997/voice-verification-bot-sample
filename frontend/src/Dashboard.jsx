import React, { useEffect, useMemo, useState } from 'react'
import { getKPIs, getLogs, getBot, setBot } from './api'
import KPICard from './KPICard'

export default function Dashboard(){
  const [kpi, setKpi] = useState({ total:0, answered:0, qualified:0, transferred:0 })
  const [logs, setLogs] = useState([])
  const [enabled, setEnabled] = useState(true)

  async function refresh(){
    setKpi(await getKPIs())
    setLogs(await getLogs())
    setEnabled((await getBot()).enabled)
  }
  useEffect(()=>{
    refresh()
    const id = setInterval(refresh, 1200)
    return ()=>clearInterval(id)
  }, [])

  const series = useMemo(()=>{
    const buckets = [0,0,0,0,0,0,0,0,0,0,0,0]
    logs.slice(0,60).forEach((_,i)=> buckets[i%12]++)
    return buckets
  }, [logs])

  async function toggle(){ await setBot(!enabled); refresh(); }

  function exportCSV(){
    const rows = logs.map(l=>`${l.at},${l.type},${l.score??''},${l.to??''},${l.callSid??''}`)
    const header = 'time,type,score,to,callSid\n'
    const blob = new Blob([header + rows.join('\n')], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'events.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="card" style={{padding:16}}>
      <div className="row" style={{justifyContent:'space-between',marginBottom:12}}>
        <div className="row">
          <span className="badge ok">Live</span>
          <span className="badge">Events: {logs.length}</span>
        </div>
        <div className="row">
          <button className="btn secondary" onClick={exportCSV}>Export CSV</button>
          <button className="btn" onClick={toggle}>{enabled ? 'Pause Bot' : 'Resume Bot'}</button>
        </div>
      </div>
      <div className="grid" style={{marginBottom:12}}>
        <KPICard label="Total Calls" value={kpi.total} series={series} />
        <KPICard label="Answered" value={kpi.answered} series={series} />
        <KPICard label="Qualified" value={kpi.qualified} series={series} />
        <KPICard label="Transferred" value={kpi.transferred} series={series} />
      </div>
      <div className="sectionTitle">Recent Events</div>
      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <table className="table">
          <thead><tr><th style={{width:180}}>Time</th><th>Type</th><th>Details</th></tr></thead>
          <tbody>
            {logs.slice(0,80).map(row => (
              <tr key={row.id}>
                <td>{new Date(row.at).toLocaleString()}</td>
                <td>{row.type}</td>
                <td style={{opacity:.9}}>
                  {row.score!=null && <>score: <b>{row.score}</b>&nbsp;&nbsp;</>}
                  {row.to && <>to: <b>{row.to}</b>&nbsp;&nbsp;</>}
                  {row.callSid && <>call: <b>{row.callSid.slice(0,8)}…</b></>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
