
import { DriftEvent } from '../domain/models'

export function extractFeatures(events: DriftEvent[]) {
  const byEntity = new Map<string, DriftEvent[]>()
  for (const e of events) {
    byEntity.set(e.entity, [...(byEntity.get(e.entity) || []), e])
  }

  return Array.from(byEntity.entries()).map(([entity, evs]) => {
    const blocks = evs.filter(e => e.severity === 'BLOCK').length
    const warns = evs.filter(e => e.severity === 'WARN').length
    return {
      entity,
      blocks,
      warns,
      total: evs.length,
    }
  })
}
