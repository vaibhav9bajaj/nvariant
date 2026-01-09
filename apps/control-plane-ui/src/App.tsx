import { useEffect, useState } from "react"
import { api, hasRole, mgr } from "./auth"

export default function App() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [result, setResult] = useState<any>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    hasRole("admin").then(setAllowed).catch(e => { setAllowed(false); setErr(String(e)) })
  }, [])

  async function runEnforce() {
    setErr(null)
    try { setResult(await api("/enforce", { method: "POST" })) }
    catch (e: any) { setErr(String(e)) }
  }

  if (allowed === null) return <div style={{ padding: 24 }}>Loading…</div>
  if (!allowed) return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Access denied</h2>
      <p>Admin role required.</p>
      <button onClick={() => mgr.signinRedirect()}>Login</button>
    </div>
  )

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>nvariant control plane</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button onClick={() => mgr.signinRedirect()}>Login</button>
        <button onClick={() => mgr.signoutRedirect()}>Logout</button>
      </div>
      <button onClick={runEnforce} style={{ padding: "10px 14px" }}>Run enforcement</button>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {result && <pre style={{ background: "#111", color: "#eee", padding: 12, borderRadius: 8 }}>
        {JSON.stringify(result, null, 2)}
      </pre>}
    </div>
  )
}
