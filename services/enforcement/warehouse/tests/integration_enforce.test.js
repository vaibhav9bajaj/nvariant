
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { enforce } from '../src/service/enforce.js'

const fixtures = JSON.parse(fs.readFileSync(new URL('./fixtures/schemas.json', import.meta.url)))

function mockPg() {
  const rows = []
  return {
    async query(sql, params) {
      if (sql.startsWith('SELECT payload')) {
        const key = params[0]
        const candidates = rows.filter(r => r.key === key).sort((a,b) => b.version - a.version)
        return { rows: candidates.length ? [{ payload: candidates[0].payload }] : [] }
      }
      if (sql.startsWith('SELECT COALESCE(MAX')) {
        const key = params[0]
        const maxV = rows.filter(r => r.key === key).reduce((m,r) => Math.max(m, r.version), 0)
        return { rows: [{ v: maxV + 1 }] }
      }
      if (sql.startsWith('INSERT INTO schema_snapshots')) {
        const [key, version, payload] = params
        rows.push({ key, version, payload })
        return { rows: [] }
      }
      throw new Error('Unknown SQL: ' + sql)
    }
  }
}

function mockWarehouse(columns) {
  return { async fetchColumns() { return columns } }
}

test('snapshots then blocks drop column', async () => {
  const pg = mockPg()
  const ref = { database:'DB', schema:'SC', table:'T' }

  const first = await enforce({ pg, warehouse: mockWarehouse(fixtures.base), ref, consumerCount: 3 })
  assert.equal(first.severity, 'ALLOW')

  const second = await enforce({ pg, warehouse: mockWarehouse(fixtures.drop_email), ref, consumerCount: 3 })
  assert.equal(second.severity, 'BLOCK')
  assert.equal(second.allowed, false)
})
