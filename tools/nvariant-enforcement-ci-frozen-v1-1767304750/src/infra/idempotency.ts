
const seen = new Set<string>()

export function isProcessed(key: string): boolean {
  return seen.has(key)
}

export function markProcessed(key: string) {
  seen.add(key)
}
