
import React from 'react'
export function SeverityBadge({ severity }: { severity: 'ALLOW'|'WARN'|'BLOCK' }) {
  const cls = severity === 'BLOCK' ? 'block' : severity === 'WARN' ? 'warn' : 'allow'
  return <span className={'badge ' + cls}>{severity}</span>
}
