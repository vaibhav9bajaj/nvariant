
import type { Column } from './api'

export interface ColumnDiffRow {
  name: string
  old?: Column
  neu?: Column
  kind: 'added' | 'removed' | 'changed' | 'same'
}

export function diffColumns(oldCols: Column[], newCols: Column[]): ColumnDiffRow[] {
  const o = new Map(oldCols.map(c => [c.name, c]))
  const n = new Map(newCols.map(c => [c.name, c]))
  const names = Array.from(new Set([...o.keys(), ...n.keys()])).sort()
  return names.map(name => {
    const old = o.get(name)
    const neu = n.get(name)
    if (!old && neu) return { name, neu, kind:'added' }
    if (old && !neu) return { name, old, kind:'removed' }
    if (old && neu) {
      const changed = old.type !== neu.type || old.nullable !== neu.nullable
      return { name, old, neu, kind: changed ? 'changed' : 'same' }
    }
    return { name, kind:'same' } as any
  })
}
