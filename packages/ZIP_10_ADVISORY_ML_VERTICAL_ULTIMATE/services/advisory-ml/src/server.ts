
import express from 'express'
import { enqueueRun } from './workers/queue'

export function startServer() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_, res) => res.json({ status: 'ok' }))
  app.post('/runs', async (req, res) => {
    const runId = await enqueueRun(req.body)
    res.status(202).json({ runId })
  })

  app.listen(8080, () => console.log('Advisory ML listening on 8080'))
}
