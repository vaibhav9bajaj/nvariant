export function dedupeKey(rec) {
  return [rec.contractId, rec.suggestionType, rec.primaryMetric, rec.window].join("|")
}
