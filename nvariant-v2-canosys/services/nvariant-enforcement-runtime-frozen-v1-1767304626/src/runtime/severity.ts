
import { ModelNode, Severity } from '../domain/models'

export function assignSeverity(model: ModelNode, warehouseSeverity: Severity): Severity {
  if (warehouseSeverity === 'BLOCK') return 'BLOCK'
  if (model.materialization === 'table' && warehouseSeverity === 'WARN') return 'WARN'
  return 'ALLOW'
}
