
import React from 'react'
import type { DriftSignal } from '../api'
import { SeverityBadge } from './SeverityBadge'

export function DriftTimeline({ signals }: { signals: DriftSignal[] }) {
  const sorted = [...signals].sort((a,b) => (a.timestamp < b.timestamp ? 1 : -1))
  return (
    <div className="card">
      <div className="h1">Drift timeline</div>
      <table className="table">
        <thead><tr><th>When</th><th>Type</th><th>Severity</th><th>Detail</th></tr></thead>
        <tbody>
          {sorted.map((s, idx) => (
            <tr key={idx}>
              <td>{new Date(s.timestamp).toLocaleString()}</td>
              <td>{s.type}</td>
              <td><SeverityBadge severity={s.severity} /></td>
              <td className="small">{JSON.stringify(s.metadata)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
