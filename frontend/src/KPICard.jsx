import React, { useEffect, useRef } from 'react'
import { animateNumber, sparkline } from './utils'
export default function KPICard({ label, value, series=[] }){
  const numRef = useRef(null)
  const sparkRef = useRef(null)
  useEffect(()=>{
    if(numRef.current) animateNumber(numRef.current, value)
    if(sparkRef.current) sparkline(sparkRef.current, series)
  }, [value, series])
  return (
    <div className="card glow">
      <div className="kpiLabel">{label}</div>
      <div className="kpiValue" ref={numRef} data-from="0">0</div>
      <canvas className="spark" ref={sparkRef}></canvas>
    </div>
  )
}
