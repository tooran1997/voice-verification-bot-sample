export function animateNumber(el, to, duration=600){
  const from = Number(el.dataset.from||0);
  const start = performance.now();
  function tick(t){
    const p = Math.min(1, (t-start)/duration);
    const val = Math.floor(from + (to-from)*easeOutCubic(p));
    el.textContent = val;
    if(p<1) requestAnimationFrame(tick); else el.dataset.from = to;
  }
  requestAnimationFrame(tick);
}
function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }
export function sparkline(canvas, points){
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0,0,w,h);
  const max = Math.max(...points,1);
  const step = w / Math.max(points.length-1,1);
  ctx.beginPath();
  points.forEach((v,i)=>{
    const x = i*step;
    const y = h - (v/max)*h;
    i? ctx.lineTo(x,y): ctx.moveTo(x,y);
  });
  ctx.strokeStyle = '#6ee7ff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#6ee7ff99';
  ctx.stroke();
}
