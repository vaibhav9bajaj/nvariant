import express from "express"
import jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"
const app = express()
app.use(express.json())

function audit(event: any) {
  console.log(JSON.stringify({ type: "audit", ts: new Date().toISOString(), ...event }))
}

function extractRoles(claims: any): string[] {
  if (claims["cognito:groups"]) return claims["cognito:groups"]
  if (claims["https://nvariant.io/roles"]) return claims["https://nvariant.io/roles"]
  if (claims["roles"]) return claims["roles"]
  return []
}

function verifyOIDC(token: string): Promise<any> {
  if (process.env.DEV_AUTH === "1") {
    return Promise.resolve(jwt.verify(token, process.env.INTERNAL_JWT_SECRET!, { issuer: "canonical-api-dev" }))
  }

  const issuer = process.env.OIDC_ISSUER
  const audience = process.env.OIDC_AUDIENCE
  const jwksUri = process.env.OIDC_JWKS_URI
  if (!issuer || !audience || !jwksUri) return Promise.reject(new Error("OIDC env not set"))

  const client = jwksClient({ jwksUri })
  function getKey(header: any, cb: any) {
    client.getSigningKey(header.kid, (err: any, key: any) => cb(err, key?.getPublicKey()))
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey as any, { issuer, audience }, (err, decoded) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
}

async function edgeAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization as string | undefined
  if (!header?.startsWith("Bearer ")) return res.sendStatus(401)
  try {
    const claims = await verifyOIDC(header.slice(7))
    req.user = { ...claims, roles: extractRoles(claims) }
    next()
  } catch {
    res.sendStatus(401)
  }
}

function requireRole(role: string) {
  return (req: any, res: any, next: any) => {
    const roles: string[] = req.user?.roles || []
    if (!roles.includes(role)) {
      audit({ actor: req.user?.sub, action: "rbac.denied", role, path: req.path })
      return res.sendStatus(403)
    }
    audit({ actor: req.user?.sub, action: "rbac.allowed", role, path: req.path })
    next()
  }
}

function mintInternal(sub: string, scope: string[]) {
  return jwt.sign({ sub, scope, aud: "nvariant-internal" }, process.env.INTERNAL_JWT_SECRET!, {
    issuer: "canonical-api",
    expiresIn: "5m"
  })
}

app.get("/health/live", (_req, res) => res.sendStatus(200))
app.get("/health/ready", (_req, res) => res.sendStatus(200))

// Dev helper: mint a dev "external" token for UIs
app.get("/dev/token", (_req, res) => {
  const token = jwt.sign(
    { sub: "dev-user", email: "dev@nvariant.io", roles: ["admin"] },
    process.env.INTERNAL_JWT_SECRET!,
    { issuer: "canonical-api-dev", expiresIn: "1h" }
  )
  res.json({ access_token: token })
})

// Explorer calls this
app.get("/contracts", edgeAuth, async (req: any, res) => {
  const internal = mintInternal(req.user.sub, ["registry:read"])
  const base = process.env.CONTRACT_REGISTRY_URL || "http://contract-registry:7001"
  const r = await fetch(base + "/", { headers: { Authorization: "Bearer " + internal } })
  res.status(r.status).send(await r.text())
})

// Control Plane uses this (admin only)
app.post("/contracts", edgeAuth, requireRole("admin"), async (req: any, res) => {
  const internal = mintInternal(req.user.sub, ["registry:write"])
  const base = process.env.CONTRACT_REGISTRY_URL || "http://contract-registry:7001"
  await fetch(base + "/contracts", { method: "POST", headers: { Authorization: "Bearer " + internal } })
  audit({ actor: req.user.sub, action: "contracts.create" })
  res.sendStatus(201)
})

app.post("/enforce", edgeAuth, requireRole("admin"), async (req: any, res) => {
  const internal = mintInternal(req.user.sub, ["enforcement:execute"])
  const base = process.env.ENFORCEMENT_URL || "http://enforcement:7004"
  const r = await fetch(base + "/run", { method: "POST", headers: { Authorization: "Bearer " + internal } })
  audit({ actor: req.user.sub, action: "enforce.run" })
  res.status(r.status).send(await r.text())
})

app.get("/lineage", edgeAuth, async (req: any, res) => {
  const internal = mintInternal(req.user.sub, ["lineage:read"])
  const base = process.env.LINEAGE_URL || "http://lineage:7006"
  const r = await fetch(base + "/graph", { headers: { Authorization: "Bearer " + internal } })
  res.status(r.status).send(await r.text())
})

app.post("/observe", edgeAuth, requireRole("admin"), async (req: any, res) => {
  const internal = mintInternal(req.user.sub, ["observation:write"])
  const base = process.env.OBSERVATION_URL || "http://observation:7008"
  await fetch(base + "/events", { method: "POST", headers: { Authorization: "Bearer " + internal } })
  audit({ actor: req.user.sub, action: "observation.write" })
  res.sendStatus(202)
})

app.listen(3000, () => console.log("canonical-api listening on :3000"))
