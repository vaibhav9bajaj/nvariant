
import test from 'node:test'
import assert from 'node:assert/strict'
import { scoreRisk } from '../src/model/risk.js'

test('scores risk higher with blocks', () => {
  const res = scoreRisk([{ entity:'t', blocks:2, warns:0, total:2 }])
  assert.ok(res[0].score > 0.5)
})
