
export interface PullRequest {
  id: string
  number: number
  repo: string
  baseSha: string
  headSha: string
  author: string
}

export interface EnforcementResult {
  allowed: boolean
  severity: 'ALLOW' | 'WARN' | 'BLOCK'
  reasons: string[]
}
