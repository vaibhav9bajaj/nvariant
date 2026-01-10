
import { ModelNode } from '../domain/models'

export function computeBlocked(models: ModelNode[]): string[] {
  const blocked = new Set<string>()
  const byId = new Map(models.map(m => [m.uniqueId, m]))

  for (const m of models) {
    if (m.severity === 'BLOCK') {
      blocked.add(m.uniqueId)
      for (const dep of m.dependsOn) {
        if (byId.has(dep)) blocked.add(dep)
      }
    }
  }
  return Array.from(blocked)
}
