
import { Column, TableRef } from '../domain/models'

export interface WarehouseClient {
  fetchColumns(ref: TableRef): Promise<Column[]>
}
