
import { assignSeverity } from '../runtime/severity'
import { gateExecution } from '../runtime/gate'
import { recordExecution } from '../infra/postgres'
import { withRetry } from '../runtime/retry'

export async function enforceRuntime({ pg, runId, models, warehouseSeverity }) {
  // Assign per-model severity
  const enriched = models.map(m => ({
    ...m,
    severity: assignSeverity(m, warehouseSeverity),
  }))

  const decision = gateExecution(enriched, warehouseSeverity)

  // Persist execution metrics (best-effort)
  await withRetry(async () => {
    for (const m of enriched) {
      await recordExecution(pg, runId, m.name, m.status || 'unknown', 0)
    }
  })

  return decision
}
