
import { extractFeatures } from './features/extract.js'
import { scoreRisk } from './model/risk.js'

export function train(events) {
  const features = extractFeatures(events)
  return scoreRisk(features)
}
