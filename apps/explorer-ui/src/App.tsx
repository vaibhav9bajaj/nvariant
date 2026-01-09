import { useEffect, useState } from "react"
import { api, mgr } from "./auth"

export default function App() {
  const [data, setData] = useState<any>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    api("/contracts").then(setData).catch(e => setErr(String(e)))
  }, [])

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>nvariant explorer</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button onClick={() => mgr.signinRedirect()}>Login</button>
        <button onClick={() => mgr.signoutRedirect()}>Logout</button>
      </div>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <pre style={{ background: "#111", color: "#eee", padding: 12, borderRadius: 8 }}>
        {data ? JSON.stringify(data, null, 2) : "Loading..."}
      </pre>
    </div>
  )
}
