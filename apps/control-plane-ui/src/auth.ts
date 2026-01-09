import { UserManager, WebStorageStateStore } from "oidc-client-ts"

export type Session = { token: string, roles: string[] }

export const mgr = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || window.location.origin + "/auth/callback",
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI || window.location.origin,
  response_type: "code",
  scope: import.meta.env.VITE_OIDC_SCOPE || "openid profile email",
  // token renew via silent iframe
  silent_redirect_uri: window.location.origin + "/auth/silent-renew",
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
})

function decodeJwt(token: string): any {
  const [, payload] = token.split(".")
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  return JSON.parse(json)
}

function extractRoles(claims: any): string[] {
  if (claims["cognito:groups"]) return claims["cognito:groups"]
  if (claims["https://nvariant.io/roles"]) return claims["https://nvariant.io/roles"]
  if (claims["roles"]) return claims["roles"]
  return []
}

export async function getSession(): Promise<Session> {
  const dev = import.meta.env.VITE_DEV_AUTH === "1"
  if (dev) {
    const r = await fetch((import.meta.env.VITE_API_BASE as string) + "/dev/token")
    const tok = (await r.json()).access_token as string
    const claims = decodeJwt(tok)
    return { token: tok, roles: extractRoles(claims) }
  }

  const user = await mgr.getUser()
  if (!user || user.expired) throw new Error("unauthorized")
  const claims = user.profile as any
  return { token: user.access_token, roles: extractRoles(claims) }
}

export async function api(path: string, init: RequestInit = {}) {
  const s = await getSession()
  const res = await fetch((import.meta.env.VITE_API_BASE as string) + path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      Authorization: "Bearer " + s.token
    }
  })
  if (res.status === 401) throw new Error("unauthorized")
  if (res.status === 403) throw new Error("forbidden")
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

export async function hasRole(role: string): Promise<boolean> {
  const s = await getSession()
  return s.roles.includes(role)
}
