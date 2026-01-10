
import express from 'express'
import { enqueueRun } from './workers/queue'

const app = express()
app.use(express.json())

app.get('/health', (_, res) => res.send({ status: 'ok' }))

app.post('/runs', async (req, res) => {
  const runId = await enqueueRun(req.body)
  res.status(202).send({ runId })
})

app.listen(8080, () => console.log('advisory-ml listening on 8080'))
