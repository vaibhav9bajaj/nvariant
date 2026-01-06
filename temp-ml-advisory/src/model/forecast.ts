
export function forecastBlockProbability(riskScores) {
  return riskScores.map(r => ({
    entity: r.entity,
    probabilityNextBlock: Math.min(0.95, r.score + 0.1),
  }))
}
