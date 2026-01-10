
export function rankDriftSignals(signals: any[]) {
  return signals.map(s => ({
    ...s,
    confidence: Math.min(1, s.severityScore / 10)
  }))
}
