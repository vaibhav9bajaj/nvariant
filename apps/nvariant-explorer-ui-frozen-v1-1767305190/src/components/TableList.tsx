
import React from 'react'
import type { TableSchema } from '../api'

export function TableList({ tables, selected, onSelect }: { tables: TableSchema[], selected?: string, onSelect:(k:string)=>void }) {
  return (
    <div className="card">
      <div className="h1">Tables</div>
      <table className="table">
        <thead>
          <tr><th>Key</th><th>Version</th><th>Columns</th></tr>
        </thead>
        <tbody>
          {tables.map(t => (
            <tr key={t.key} style={{background: selected===t.key?'#fafbff':'transparent', cursor:'pointer'}} onClick={() => onSelect(t.key)}>
              <td><b>{t.key}</b></td>
              <td>{t.version}</td>
              <td>{t.columns.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
