
import { WarehouseClient } from './warehouse'
import { Column, TableRef } from '../domain/models'

export class RedshiftClient implements WarehouseClient {
  constructor(private client: { query: (sql: string, params: any[]) => Promise<{ rows: any[] }> }) {}
  async fetchColumns(ref: TableRef): Promise<Column[]> {
    const sql = `
      SELECT "column" AS name, "type" AS type, (notnull = false) AS nullable
      FROM pg_table_def
      WHERE schemaname = $1 AND tablename = $2;
    `
    const res = await this.client.query(sql, [ref.schema, ref.table])
    return res.rows.map(r => ({ name: r.name, type: r.type, nullable: !!r.nullable }))
  }
}
