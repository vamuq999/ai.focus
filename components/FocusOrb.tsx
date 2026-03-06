"use client";

import { useState, useRef } from "react";

export default function FocusOrb() {
  const [score, setScore] = useState<number | null>(null);
  const [holding, setHolding] = useState(false);
  const movements = useRef<number[]>([]);
  const lastPos = useRef<{x:number,y:number}|null>(null);

  function start(e:any){
    setHolding(true);
    movements.current = [];
    lastPos.current = {x:e.clientX,y:e.clientY};
  }

  function move(e:any){
    if(!holding || !lastPos.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    const dist = Math.sqrt(dx*dx+dy*dy);
    movements.current.push(dist);

    lastPos.current = {x:e.clientX,y:e.clientY};
  }

  function end(){
    setHolding(false);

    const total = movements.current.reduce((a,b)=>a+b,0);
    const avg = movements.current.length ? total/movements.current.length : 0;

    let focus = Math.max(0,100 - avg*15);
    focus = Math.min(100,Math.round(focus));

    setScore(focus);
  }

  function stateLabel(s:number){
    if(s>80) return "Deep Focus";
    if(s>60) return "Focused";
    if(s>30) return "Settling";
    return "Distracted";
  }

  return (
    <div className="focus-shell">
      <div
        className={`orb ${holding ? "orb-active":""}`}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
      />

      {holding && (
        <p className="signal">Focus signal rising…</p>
      )}

      {score!==null && !holding && (
        <>
          <h2>Focus Score: {score}%</h2>
          <p className="state">{stateLabel(score)}</p>
        </>
      )}

      <p className="hint">
        Press and hold the orb. Stay steady.
      </p>
    </div>
  );
}