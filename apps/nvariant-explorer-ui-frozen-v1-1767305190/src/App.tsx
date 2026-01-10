
import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Navbar } from './components/Navbar'
import { TableList } from './components/TableList'
import { SchemaView } from './components/SchemaView'
import { DiffView } from './components/DiffView'
import { DriftTimeline } from './components/DriftTimeline'
import { LineageGraph } from './components/LineageGraph'
import { can, Role } from './rbac'
import { getDrift, getLineage, getTable, listTables, TableSchema } from './api'

const defaultUser = { email:'you@company.com', roles: ['VIEWER'] as Role[] }

export default function App() {
  const [tab, setTab] = useState<'browse'|'drift'|'lineage'>('browse')
  const [user, setUser] = useState(defaultUser)
  const [q, setQ] = useState('DB.')
  const [tables, setTables] = useState<TableSchema[]>([])
  const [selected, setSelected] = useState<string>('')
  const [table, setTable] = useState<TableSchema | null>(null)
  const [prev, setPrev] = useState<TableSchema | null>(null)
  const [signals, setSignals] = useState<any[]>([])
  const [lineage, setLineage] = useState<any>(null)
  const canView = can('VIEW', user.roles)

  useEffect(() => {
    listTables(q).then(setTables).catch(console.error)
  }, [q])

  useEffect(() => {
    if (!selected) return
    getTable(selected).then(t => { setTable(t); setPrev({ ...t, version: Math.max(1, t.version-1) }) }).catch(console.error)
    getDrift(selected).then(setSignals).catch(() => setSignals([]))
    getLineage(selected).then(setLineage).catch(() => setLineage(null))
  }, [selected])

  const rolePicker = useMemo(() => (
    <select className="input" value={user.roles[0]} onChange={e => setUser({ ...user, roles: [e.target.value as Role] })} style={{width:220}}>
      <option value="VIEWER">VIEWER</option>
      <option value="CONSUMER">CONSUMER</option>
      <option value="PRODUCER">PRODUCER</option>
      <option value="APPROVER">APPROVER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  ), [user])

  if (!canView) {
    return <div className="container"><div className="card"><div className="h1">Forbidden</div><div className="small">Your role does not permit viewing Explorer.</div></div></div>
  }

  return (
    <>
      <Navbar tab={tab} setTab={setTab} user={user} />
      <div className="container">
        <div className="row" style={{alignItems:'center'}}>
          <div className="col">
            <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Search tables..." />
          </div>
          <div style={{width:12}} />
          <div className="col" style={{maxWidth:260}}>
            {rolePicker}
            <div className="small">Role simulation (UI enforcement demo)</div>
          </div>
        </div>

        <div style={{height:12}} />

        <div className="row">
          <div className="col" style={{flex: 1}}>
            <TableList tables={tables} selected={selected} onSelect={setSelected} />
          </div>
          <div className="col" style={{flex: 1.5}}>
            {table ? <SchemaView table={table} /> : <div className="card"><div className="h1">Select a table</div><div className="small">Pick a dataset to view schema, drift, and lineage.</div></div>}
            <div style={{height:12}} />
            {table && prev && <DiffView older={prev} newer={table} />}
          </div>
        </div>

        <div style={{height:12}} />

        {table && tab === 'drift' && (
          <>
            <DriftTimeline signals={signals} />
            <div style={{height:12}} />
            <div className="card">
              <div className="h1">Acknowledgement</div>
              <div className="small">Consumers can acknowledge impact here (UI enforcement demo).</div>
              <button className="btn" disabled={!can('ACK_IMPACT', user.roles)}>Acknowledge impact</button>
            </div>
          </>
        )}

        {table && tab === 'lineage' && lineage && (
          <LineageGraph nodes={lineage.nodes} edges={lineage.edges} />
        )}
      </div>
    </>
  )
}
