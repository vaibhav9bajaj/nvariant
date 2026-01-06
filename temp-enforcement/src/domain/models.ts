
export type Severity = 'ALLOW' | 'WARN' | 'BLOCK'

export interface RuntimeContext {
  runId: string
  triggeredBy: 'CI' | 'SCHEDULE' | 'MANUAL'
  timestamp: string
}

export interface ModelNode {
  uniqueId: string
  name: string
  dependsOn: string[]
  materialization: string
  severity?: Severity
  status?: 'success' | 'error' | 'skipped'
}

export interface RuntimeDecision {
  allowed: boolean
  severity: Severity
  blockedModels: string[]
  reasons: string[]
}
