
import test from 'node:test'
import assert from 'node:assert/strict'
import { enforcePullRequest } from '../src/enforce/prEnforce.js'

test('blocks breaking changes', () => {
  const res = enforcePullRequest({ breakingChanges: 1, warnings: 0 })
  assert.equal(res.allowed, false)
  assert.equal(res.severity, 'BLOCK')
})
