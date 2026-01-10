
import { RuntimeDecision, ModelNode, Severity } from '../domain/models'
import { computeBlocked } from './dag'

export function gateExecution(models: ModelNode[], warehouseSeverity: Severity): RuntimeDecision {
  const blockedModels = computeBlocked(models)
  const blocked = blockedModels.length > 0 || warehouseSeverity === 'BLOCK'

  return {
    allowed: !blocked,
    severity: blocked ? 'BLOCK' : warehouseSeverity,
    blockedModels,
    reasons: blocked ? ['Runtime enforcement blocked execution'] : ['Execution allowed'],
  }
}
