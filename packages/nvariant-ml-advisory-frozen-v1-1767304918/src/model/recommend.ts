
export function recommend(riskScores) {
  return riskScores.map(r => {
    if (r.score > 0.7) {
      return {
        entity: r.entity,
        type: 'TIGHTEN_CONTRACT',
        rationale: 'Frequent breaking changes detected',
      }
    }
    if (r.score > 0.3) {
      return {
        entity: r.entity,
        type: 'ADD_MONITORING',
        rationale: 'Moderate drift frequency',
      }
    }
    return {
      entity: r.entity,
      type: 'RELAX_CONTRACT',
      rationale: 'Low risk over time',
    }
  })
}
