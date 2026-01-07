
import { TableSchema, SchemaChange } from './models'

export function diffSchemas(oldSchema: TableSchema, newSchema: TableSchema): SchemaChange[] {
  if (oldSchema.hash && newSchema.hash && oldSchema.hash === newSchema.hash) return []

  const changes: SchemaChange[] = []
  const oldCols = new Map(oldSchema.columns.map(c => [c.name, c]))
  const newCols = new Map(newSchema.columns.map(c => [c.name, c]))

  for (const [name] of oldCols) {
    if (!newCols.has(name)) changes.push({ type: 'DROP_COLUMN', column: name })
  }

  for (const [name, newCol] of newCols) {
    if (!oldCols.has(name)) {
      changes.push({ type: 'ADD_COLUMN', column: name })
      continue
    }
    const oldCol = oldCols.get(name)!
    if (oldCol.type !== newCol.type) {
      changes.push({ type: 'TYPE_CHANGE', column: name, from: oldCol.type, to: newCol.type })
    }
    if (oldCol.nullable !== newCol.nullable) {
      changes.push({ type: 'NULLABILITY_CHANGE', column: name, from: oldCol.nullable, to: newCol.nullable })
    }
  }
  return changes
}
