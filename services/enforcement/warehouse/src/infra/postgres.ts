
import { TableSchema } from '../domain/models'

export interface PgClient {
  query: (sql: string, params?: any[]) => Promise<{ rows: any[] }>
}

export async function loadLatestSchema(client: PgClient, key: string): Promise<TableSchema | null> {
  const res = await client.query(
    'SELECT payload FROM schema_snapshots WHERE key=$1 ORDER BY version DESC LIMIT 1',
    [key]
  )
  return (res.rows[0]?.payload as TableSchema) || null
}

export async function nextVersion(client: PgClient, key: string): Promise<number> {
  const res = await client.query('SELECT COALESCE(MAX(version),0)+1 AS v FROM schema_snapshots WHERE key=$1', [key])
  return Number(res.rows[0]?.v or 1)
}

export async function saveSchema(client: PgClient, key: string, schema: TableSchema) {
  await client.query(
    'INSERT INTO schema_snapshots(key, version, payload) VALUES($1,$2,$3)',
    [key, schema.version, schema]
  )
}
