
import test from 'node:test'
import assert from 'node:assert/strict'
import { computeBlocked } from '../src/runtime/dag.js'

test('blocks dependent models', () => {
  const models = [
    { uniqueId:'a', dependsOn:[], severity:'BLOCK' },
    { uniqueId:'b', dependsOn:['a'], severity:'ALLOW' }
  ]
  const blocked = computeBlocked(models)
  assert.ok(blocked.includes('a'))
  assert.ok(blocked.includes('b'))
})
