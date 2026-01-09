# explorer-ui

## Purpose
Read-only exploration UI for contracts, lineage, and system state.

## Exposure
- **Access**: public (behind ALB/Ingress)
- **Talks to**: `canonical-api`

## Auth
- Uses **OIDC** (Auth0 or Cognito) via `oidc-client-ts`
- Silent renewal enabled (iframe flow)
- Dev mode: `VITE_DEV_AUTH=1` fetches a token from `canonical-api` at `/dev/token`

## Roles / gating
- Required roles: **viewer, admin**
- UI hides/blocks admin actions when role is missing
- Backend RBAC is still authoritative (UI gating is convenience)

## API
- `VITE_API_BASE` points to the canonical API (e.g. `https://api.nvariant.io`)

## Local run
```bash
npm install
npm run dev
```

## Environment variables
- `VITE_API_BASE` (required)
- `VITE_DEV_AUTH` (dev only)
- `VITE_OIDC_AUTHORITY`
- `VITE_OIDC_CLIENT_ID`
- `VITE_OIDC_REDIRECT_URI`
- `VITE_OIDC_POST_LOGOUT_REDIRECT_URI`
- `VITE_OIDC_AUDIENCE`
- `VITE_OIDC_SCOPE`
