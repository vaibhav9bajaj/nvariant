
export interface AdvisoryRecommendation {
  recommendationId: string
  runId: string
  contractId: string
  suggestionType: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  confidence: number
  diff: { before: string; after: string }
  evidence: any[]
  explanationMd: string
  createdAt: string
}
