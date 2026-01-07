
import React, { useMemo, useState } from 'react'
import type { TableSchema } from '../api'
import { diffColumns } from '../diff'

export function DiffView({ older, newer }: { older: TableSchema, newer: TableSchema }) {
  const rows = useMemo(() => diffColumns(older.columns, newer.columns), [older, newer])
  const [only, setOnly] = useState<'all'|'changed'>('changed')
  const shown = rows.filter(r => only==='all' ? true : r.kind!=='same')
  return (
    <div className="card">
      <div className="row" style={{alignItems:'center'}}>
        <div className="h1" style={{margin:0}}>Diff</div>
        <div style={{flex:1}} />
        <select className="input" style={{width:180}} value={only} onChange={e => setOnly(e.target.value as any)}>
          <option value="changed">Changed only</option>
          <option value="all">All columns</option>
        </select>
      </div>
      <div className="small">Comparing v{older.version} → v{newer.version}</div>
      <div style={{height:10}} />
      <table className="table">
        <thead><tr><th>Column</th><th>Before</th><th>After</th><th>Status</th></tr></thead>
        <tbody>
          {shown.map(r => (
            <tr key={r.name}>
              <td><b>{r.name}</b></td>
              <td>{r.old ? `${r.old.type}${r.old.nullable?' (null)':''}` : <span className="diffDel">—</span>}</td>
              <td>{r.neu ? `${r.neu.type}${r.neu.nullable?' (null)':''}` : <span className="diffDel">—</span>}</td>
              <td>
                {r.kind==='added' && <span className="diffAdd">added</span>}
                {r.kind==='removed' && <span className="diffDel">removed</span>}
                {r.kind==='changed' && <span className="badge warn">changed</span>}
                {r.kind==='same' && <span className="small">same</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
