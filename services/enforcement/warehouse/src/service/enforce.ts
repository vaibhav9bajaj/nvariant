
import { TableRef, EnforcementDecision } from '../domain/models'
import { buildSchema } from '../domain/normalize'
import { diffSchemas } from '../domain/diff'
import { classify } from '../domain/compatibility'
import { enforceSafeguards, DefaultSafeguards } from '../domain/safeguards'
import { PgClient, loadLatestSchema, nextVersion, saveSchema } from '../infra/postgres'
import { WarehouseClient } from '../infra/warehouse'

export interface EnforceInput {
  pg: PgClient
  warehouse: WarehouseClient
  ref: TableRef
  consumerCount: number
  safeguards?: Partial<typeof DefaultSafeguards>
}

export async function enforce(input: EnforceInput): Promise<EnforcementDecision> {
  const { pg, warehouse, ref, consumerCount } = input
  const key = `${ref.database}.${ref.schema}.${ref.table}`

  const cols = await warehouse.fetchColumns(ref)
  enforceSafeguards(cols, { ...DefaultSafeguards, ...(input.safeguards || {}) })

  const prev = await loadLatestSchema(pg, key)
  const version = await nextVersion(pg, key)
  const next = buildSchema(ref, cols, version)

  if (!prev) {
    await saveSchema(pg, key, next)
    return { allowed: true, severity: 'ALLOW', reasons: ['Initial snapshot'], changes: [], consumerImpact: { breaking: false, affectedConsumers: consumerCount } }
  }

  const changes = diffSchemas(prev, next)
  const { severity, breaking, reasons } = classify(changes)

  const maxReasons = (input.safeguards?.maxReasons ?? DefaultSafeguards.maxReasons)
  const maxChanges  = (input.safeguards?.maxChanges ?? DefaultSafeguards.maxChanges)

  const decision: EnforcementDecision = {
    allowed: severity !== 'BLOCK',
    severity,
    reasons: reasons.slice(0, maxReasons),
    changes: changes.slice(0, maxChanges),
    consumerImpact: { breaking, affectedConsumers: consumerCount },
  }

  if (decision.allowed) {
    await saveSchema(pg, key, next)
  }

  return decision
}
