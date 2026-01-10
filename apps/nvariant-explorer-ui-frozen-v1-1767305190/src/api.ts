
export type Severity = 'ALLOW' | 'WARN' | 'BLOCK'

export interface Column { name: string; type: string; nullable: boolean }
export interface TableSchema { key: string; database: string; schema: string; table: string; version: number; capturedAt: string; columns: Column[] }
export interface DriftSignal { type: 'SCHEMA'|'RUNTIME'|'CI'; entity: string; severity: Severity; timestamp: string; metadata: any }
export interface LineageNode { id: string; label: string; kind: 'producer'|'table'|'consumer' }
export interface LineageEdge { from: string; to: string }

const baseUrl = (import.meta as any).env?.VITE_API_BASE || ''

async function j<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(baseUrl + path, { headers: { 'Content-Type':'application/json' }, ...init })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// Expected endpoints from backends; UI falls back to mock when unavailable
export async function listTables(q: string): Promise<TableSchema[]> {
  try { return await j(`/explorer/tables?q=${encodeURIComponent(q)}`) } catch {
    return mockTables().filter(t => t.key.toLowerCase().includes(q.toLowerCase()))
  }
}

export async function getTable(key: string): Promise<TableSchema> {
  try { return await j(`/explorer/table?key=${encodeURIComponent(key)}`) } catch {
    return mockTables().find(t => t.key === key)!
  }
}

export async function getDrift(key: string): Promise<DriftSignal[]> {
  try { return await j(`/explorer/drift?entity=${encodeURIComponent(key)}`) } catch {
    return mockDrift().filter(d => d.entity === key)
  }
}

export async function getLineage(key: string): Promise<{nodes:LineageNode[]; edges:LineageEdge[]}> {
  try { return await j(`/lineage/graph?entity=${encodeURIComponent(key)}`) } catch {
    return mockLineage(key)
  }
}

function mockTables(): TableSchema[] {
  return [
    {
      key: 'DB.PUBLIC.USERS',
      database: 'DB',
      schema: 'PUBLIC',
      table: 'USERS',
      version: 12,
      capturedAt: new Date().toISOString(),
      columns: [
        { name:'id', type:'INTEGER', nullable:false },
        { name:'email', type:'VARCHAR', nullable:true },
        { name:'created_at', type:'TIMESTAMP', nullable:false },
      ]
    },
    {
      key: 'DB.PUBLIC.ORDERS',
      database: 'DB',
      schema: 'PUBLIC',
      table: 'ORDERS',
      version: 4,
      capturedAt: new Date().toISOString(),
      columns: [
        { name:'order_id', type:'BIGINT', nullable:false },
        { name:'user_id', type:'INTEGER', nullable:false },
        { name:'total', type:'NUMBER', nullable:false },
      ]
    }
  ]
}

function mockDrift(): DriftSignal[] {
  const now = Date.now()
  return [
    { type:'SCHEMA', entity:'DB.PUBLIC.USERS', severity:'WARN', timestamp:new Date(now-86400000*2).toISOString(), metadata:{ change:'Type widening id INTEGER->BIGINT' } },
    { type:'SCHEMA', entity:'DB.PUBLIC.USERS', severity:'BLOCK', timestamp:new Date(now-86400000*6).toISOString(), metadata:{ change:'Drop column email' } },
    { type:'RUNTIME', entity:'DB.PUBLIC.USERS', severity:'ALLOW', timestamp:new Date(now-86400000*1).toISOString(), metadata:{ runId:'dbt_123', status:'success' } },
  ]
}

function mockLineage(key: string) {
  return {
    nodes: [
      { id:'p1', label:'producer: dbt', kind:'producer' },
      { id:'t', label:key, kind:'table' },
      { id:'c1', label:'consumer: dashboard', kind:'consumer' },
      { id:'c2', label:'consumer: marketing-seg', kind:'consumer' },
    ],
    edges: [
      { from:'p1', to:'t' },
      { from:'t', to:'c1' },
      { from:'t', to:'c2' },
    ]
  }
}
