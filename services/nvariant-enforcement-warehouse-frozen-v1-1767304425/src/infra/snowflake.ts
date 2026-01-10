
import { WarehouseClient } from './warehouse'
import { Column, TableRef } from '../domain/models'

export class SnowflakeClient implements WarehouseClient {
  constructor(private conn: { execute: (sql: string, binds: any[]) => Promise<any[]> }) {}
  async fetchColumns(ref: TableRef): Promise<Column[]> {
    const sql = `
      SELECT column_name AS name, data_type AS type, (is_nullable='YES') AS nullable
      FROM information_schema.columns
      WHERE table_catalog = ? AND table_schema = ? AND table_name = ?
      ORDER BY ordinal_position;
    `
    const rows = await this.conn.execute(sql, [ref.database, ref.schema, ref.table])
    return rows.map(r => ({ name: r.name ?? r.NAME, type: r.type ?? r.TYPE, nullable: !!(r.nullable ?? r.NULLABLE) }))
  }
}
