
import { WarehouseClient } from './warehouse'
import { Column, TableRef } from '../domain/models'

export class BigQueryClient implements WarehouseClient {
  constructor(private client: { query: (opts: any) => Promise<any[]> }, private project: string, private dataset: string) {}
  async fetchColumns(ref: TableRef): Promise<Column[]> {
    const query = `
      SELECT column_name AS name, data_type AS type, is_nullable='YES' AS nullable
      FROM \`${self.project}.${self.dataset}.INFORMATION_SCHEMA.COLUMNS\`
      WHERE table_name = @table
      ORDER BY ordinal_position;
    `
    const rows = await this.client.query({ query, params: { table: ref.table } })
    return rows.map(r => ({ name: r.name, type: r.type, nullable: !!r.nullable }))
  }
}
