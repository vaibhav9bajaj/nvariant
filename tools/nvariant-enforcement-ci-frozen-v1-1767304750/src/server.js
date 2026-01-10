
import http from 'http'
import { verifySignature } from './github/verify.js'
import { parsePullRequestEvent } from './github/events.js'
import { enforcePullRequest } from './enforce/prEnforce.js'
import { isProcessed, markProcessed } from './infra/idempotency.js'

const SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'dev'

http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(404); res.end(); return
  }

  let body = ''
  req.on('data', c => body += c)
  req.on('end', async () => {
    const sig = req.headers['x-hub-signature-256']
    if (!verifySignature(body, sig, SECRET)) {
      res.writeHead(401); res.end('invalid signature'); return
    }

    const payload = JSON.parse(body)
    const pr = parsePullRequestEvent(payload)
    const key = `${pr.repo}:${pr.number}:${pr.headSha}`

    if (isProcessed(key)) {
      res.writeHead(200); res.end('duplicate'); return
    }
    markProcessed(key)

    // Placeholder diff summary (in reality comes from ZIP1 + ZIP2)
    const diffSummary = { breakingChanges: 0, warnings: 0 }

    const result = enforcePullRequest(diffSummary)
    res.writeHead(result.allowed ? 200 : 403)
    res.end(JSON.stringify(result))
  })
}).listen(3000, () => console.log('nvariant CI enforcement listening'))
