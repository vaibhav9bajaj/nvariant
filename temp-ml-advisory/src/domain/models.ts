
export interface DriftEvent {
  entity: string
  severity: 'ALLOW' | 'WARN' | 'BLOCK'
  timestamp: string
  metadata: any
}

export interface RiskScore {
  entity: string
  score: number // 0–1
  explanation: string[]
}

export interface Recommendation {
  entity: string
  type: 'RELAX_CONTRACT' | 'TIGHTEN_CONTRACT' | 'ADD_MONITORING'
  rationale: string
}
