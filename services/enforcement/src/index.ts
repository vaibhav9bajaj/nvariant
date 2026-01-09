import express from "express"
import jwt from "jsonwebtoken"
import { Pool } from "pg"
import { v4 as uuid } from "uuid"

const app = express()
app.use(express.json())

app.use((req: any, _res: any, next: any) => {
  req.correlationId = req.headers["x-correlation-id"] || uuid()
  next()
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function auth(required: string[]) {
  return (req: any, res: any, next: any) => {
    const header = req.headers.authorization as string | undefined
    if (!header?.startsWith("Bearer ")) return res.sendStatus(401)
    try {
      const decoded: any = jwt.verify(header.slice(7), process.env.INTERNAL_JWT_SECRET!, {
        audience: "nvariant-internal"
      })
      const scopes: string[] = decoded.scope || []
      if (!required.every(s => scopes.includes(s))) return res.sendStatus(403)
      req.internal = decoded
      next()
    } catch {
      return res.sendStatus(403)
    }
  }
}

function log(message: string, meta: any = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), service: "enforcement", message, ...meta }))
}

app.get("/health/live", (_req, res) => res.sendStatus(200))
app.get("/health/ready", async (_req, res) => {
  try { await pool.query("select 1"); res.sendStatus(200) } catch { res.sendStatus(503) }
})

app.get("/", auth(["enforcement:read"]), (req: any, res) => {
  log("read", { correlationId: req.correlationId, sub: req.internal?.sub })
  res.json({ service: "enforcement", ok: true })
})


app.post("/run", auth(["enforcement:execute"]), (_req, res) => {
  res.json({ ok: true, enforced: true })
})


app.listen(7004, () => log("listening", { port: 7004 }))
