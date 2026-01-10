
export interface Column {
  name: string
  type: string
  nullable: boolean
}

export interface TableRef {
  database: string
  schema: string
  table: string
}

export interface TableSchema extends TableRef {
  columns: Column[]
  version: number
  capturedAt: string // ISO
  hash: string       // content hash for fast comparisons
}

export type ChangeType =
  | 'ADD_COLUMN'
  | 'DROP_COLUMN'
  | 'TYPE_CHANGE'
  | 'NULLABILITY_CHANGE'

export interface SchemaChange {
  type: ChangeType
  column: string
  from?: any
  to?: any
}

export interface ConsumerImpact {
  breaking: boolean
  affectedConsumers: number
}

export interface EnforcementDecision {
  allowed: boolean
  severity: 'ALLOW' | 'WARN' | 'BLOCK'
  reasons: string[]
  changes: SchemaChange[]
  consumerImpact: ConsumerImpact
}
