
import { EnforcementResult } from '../domain/models'

export function enforcePullRequest(diffSummary): EnforcementResult {
  if (diffSummary.breakingChanges > 0) {
    return {
      allowed: false,
      severity: 'BLOCK',
      reasons: ['Breaking contract changes detected'],
    }
  }
  if (diffSummary.warnings > 0) {
    return {
      allowed: true,
      severity: 'WARN',
      reasons: ['Potentially risky contract changes'],
    }
  }
  return { allowed: true, severity: 'ALLOW', reasons: ['No contract violations'] }
}
