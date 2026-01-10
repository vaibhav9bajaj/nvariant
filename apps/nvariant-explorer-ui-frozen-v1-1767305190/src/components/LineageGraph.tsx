
import React, { useMemo } from 'react'
import type { LineageEdge, LineageNode } from '../api'

function nodeColor(kind: string) {
  if (kind==='producer') return '#111'
  if (kind==='consumer') return '#555'
  return '#2a2a2a'
}

export function LineageGraph({ nodes, edges }: { nodes: LineageNode[], edges: LineageEdge[] }) {
  const layout = useMemo(() => {
    // Simple left-to-right layering: producers -> table -> consumers
    const producers = nodes.filter(n => n.kind==='producer')
    const tables = nodes.filter(n => n.kind==='table')
    const consumers = nodes.filter(n => n.kind==='consumer')

    const pos: Record<string, {x:number,y:number}> = {}
    producers.forEach((n,i) => pos[n.id] = { x: 80, y: 80 + i*90 })
    tables.forEach((n,i) => pos[n.id] = { x: 360, y: 110 + i*110 })
    consumers.forEach((n,i) => pos[n.id] = { x: 680, y: 80 + i*90 })

    return pos
  }, [nodes])

  const width = 900
  const height = Math.max(260, nodes.length*90)

  return (
    <div className="card" style={{overflow:'auto'}}>
      <div className="h1">Lineage</div>
      <svg width={width} height={height}>
        {edges.map((e, i) => {
          const a = layout[e.from]; const b = layout[e.to]
          if (!a || !b) return null
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#cbd2e1" strokeWidth="2" />
        })}
        {nodes.map(n => {
          const p = layout[n.id]; if (!p) return null
          return (
            <g key={n.id}>
              <rect x={p.x-60} y={p.y-18} width={140} height={36} rx="10" fill="#fff" stroke="#e6e8ee" />
              <circle cx={p.x-42} cy={p.y} r="6" fill={nodeColor(n.kind)} />
              <text x={p.x-28} y={p.y+4} fontSize="12" fill="#111">{n.label}</text>
            </g>
          )
        })}
      </svg>
      <div className="small">Producer/consumer inference comes from lineage engine; this view renders a simplified DAG.</div>
    </div>
  )
}
