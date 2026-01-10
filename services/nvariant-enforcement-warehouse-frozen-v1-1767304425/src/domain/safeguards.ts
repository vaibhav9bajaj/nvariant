
import { Column } from './models'

export interface SafeguardConfig {
  maxColumns: number
  maxReasons: number
  maxChanges: number
}

export const DefaultSafeguards: SafeguardConfig = {
  maxColumns: 2000,
  maxReasons: 200,
  maxChanges: 5000,
}

export function enforceSafeguards(cols: Column[], cfg: SafeguardConfig = DefaultSafeguards) {
  if (cols.length > cfg.maxColumns) {
    throw new Error(`Schema too wide: ${cols.length} columns exceeds maxColumns=${cfg.maxColumns}`)
  }
}
