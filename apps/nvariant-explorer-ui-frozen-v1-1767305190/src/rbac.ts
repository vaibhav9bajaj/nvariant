
export type Role = 'ADMIN' | 'PRODUCER' | 'CONSUMER' | 'APPROVER' | 'VIEWER'
export type Permission = 'VIEW' | 'ACK_IMPACT' | 'PROPOSE_CONTRACT' | 'APPROVE_CONTRACT' | 'CONFIGURE_SYSTEM'

const matrix: Record<Permission, Role[]> = {
  VIEW: ['ADMIN','PRODUCER','CONSUMER','APPROVER','VIEWER'],
  ACK_IMPACT: ['CONSUMER'],
  PROPOSE_CONTRACT: ['PRODUCER'],
  APPROVE_CONTRACT: ['APPROVER'],
  CONFIGURE_SYSTEM: ['ADMIN'],
}

export function can(permission: Permission, roles: Role[]) {
  return roles.some(r => matrix[permission].includes(r))
}
