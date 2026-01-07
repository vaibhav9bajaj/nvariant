
import crypto from 'crypto'
import { Column, TableSchema, TableRef } from './models'

export function normalizeColumns(cols: Column[]): Column[] {
  return [...cols].sort((a,b) => a.name.localeCompare(b.name))
}

export function hashSchema(ref: TableRef, cols: Column[]): string {
  const payload = JSON.stringify({
    database: ref.database,
    schema: ref.schema,
    table: ref.table,
    columns: normalizeColumns(cols),
  })
  return crypto.createHash('sha256').update(payload).digest('hex')
}

export function buildSchema(ref: TableRef, cols: Column[], version: number): TableSchema {
  const normalized = normalizeColumns(cols)
  const hash = hashSchema(ref, normalized)
  return {
    ...ref,
    columns: normalized,
    version,
    capturedAt: new Date().toISOString(),
    hash,
  }
}
