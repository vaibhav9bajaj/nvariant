
export type AdvisoryRecommendation = {
  recommendationId: string
  runId: string
  contractId: string
  suggestionType:
    | "TIGHTEN_THRESHOLD"
    | "RELAX_THRESHOLD"
    | "ADD_CHECK"
    | "REMOVE_CHECK"
    | "ADD_FIELD_METADATA"
    | "DEPRECATE_CHECK"
    | "INVESTIGATE_DRIFT"
  severity: "LOW" | "MEDIUM" | "HIGH"
  confidence: number
  diff: { before: string; after: string; patch?: any }
  evidence: Array<{
    type:
      | "DISTRIBUTION_SHIFT"
      | "NULL_RATE_CHANGE"
      | "CARDINALITY_CHANGE"
      | "SEMANTIC_SHIFT"
      | "LINEAGE_BLAST_RADIUS"
    metric?: string
    value?: number
    window?: string
    details?: any
  }>
  explanationMd: string
  createdAt: string
}
