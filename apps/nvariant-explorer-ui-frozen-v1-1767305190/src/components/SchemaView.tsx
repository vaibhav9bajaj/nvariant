
import React from 'react'
import type { TableSchema } from '../api'

export function SchemaView({ table }: { table: TableSchema }) {
  return (
    <div className="card">
      <div className="h1">Schema</div>
      <div className="kv">
        <div><b>Database</b><br />{table.database}</div>
        <div><b>Schema</b><br />{table.schema}</div>
        <div><b>Table</b><br />{table.table}</div>
        <div><b>Version</b><br />{table.version}</div>
        <div><b>Captured</b><br />{new Date(table.capturedAt).toLocaleString()}</div>
      </div>
      <div style={{height:10}} />
      <table className="table">
        <thead><tr><th>Column</th><th>Type</th><th>Nullable</th></tr></thead>
        <tbody>
          {table.columns.map(c => (
            <tr key={c.name}>
              <td><b>{c.name}</b></td>
              <td>{c.type}</td>
              <td>{c.nullable ? 'YES' : 'NO'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
