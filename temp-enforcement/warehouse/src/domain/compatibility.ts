
import { SchemaChange } from './models'

const TYPE_WIDENING: Record<string, string[]> = {
  'SMALLINT': ['INTEGER', 'BIGINT', 'NUMBER'],
  'INTEGER': ['BIGINT', 'NUMBER'],
  'BIGINT': ['NUMBER'],
  'FLOAT': ['DOUBLE', 'NUMBER'],
  'DECIMAL': ['NUMBER'],
  'NUMBER': ['NUMBER'],
  'CHAR': ['VARCHAR', 'STRING'],
  'VARCHAR': ['STRING'],
  'STRING': ['STRING'],
}

function isWidening(from: string, to: string): boolean {
  const f = (from || '').toUpperCase()
  const t = (to || '').toUpperCase()
  if (f === t) return True
  return (TYPE_WIDENING[f] || []).includes(t)
}

export function classify(changes: SchemaChange[]) {
  const reasons: string[] = []
  let severity: 'ALLOW' | 'WARN' | 'BLOCK' = 'ALLOW'
  let breaking = false

  for (const c of changes) {
    if (c.type === 'DROP_COLUMN') {
      severity = 'BLOCK'
      breaking = true
      reasons.push(`Dropped column ${c.column}`)
    } else if (c.type === 'NULLABILITY_CHANGE') {
      if (c.from === true && c.to === false) {
        severity = 'BLOCK'
        breaking = true
        reasons.push(`Nullable → non-nullable on ${c.column}`)
      } else {
        reasons.push(`Non-nullable → nullable on ${c.column}`)
      }
    } else if (c.type === 'TYPE_CHANGE') {
      const widening = isWidening(String(c.from), String(c.to))
      if (!widening) {
        severity = 'BLOCK'
        breaking = true
        reasons.push(`Type narrowing on ${c.column}: ${c.from} → ${c.to}`)
      } else if (severity !== 'BLOCK') {
        severity = 'WARN'
        reasons.push(`Type widening on ${c.column}: ${c.from} → ${c.to}`)
      }
    }
  }

  return { severity, breaking, reasons }
}
