# canonical-api

## Purpose
Public edge API for nvariant. Validates **OIDC access tokens** (Auth0 or Cognito), enforces **RBAC**, and mints short‑lived **internal JWTs** for calls to internal services.

## Exposure
- **Access**: public (behind ALB/Ingress)
- **Calls**: internal services over ClusterIP
- **Primary clients**: Explorer UI, Control Plane UI

## Auth
- **Production**: OIDC JWT verification using:
  - `OIDC_ISSUER`
  - `OIDC_AUDIENCE`
  - `OIDC_JWKS_URI`
- **Roles**:
  - Cognito: `cognito:groups`
  - Auth0: `https://nvariant.io/roles` (recommended namespaced claim)
- **Dev mode**: `DEV_AUTH=1` enables `/dev/token` for local testing only.

## RBAC
- Viewer/admin routes are gated by roles
- Admin routes require `admin`

## Endpoints
- `GET /health/live`
- `GET /health/ready`
- `GET /contracts`
- `POST /contracts` (admin)
- `POST /enforce` (admin)
- `GET /lineage`
- `POST /observe` (admin)
- `GET /dev/token` (dev only)

## Port
- `3000`

## Local run
```bash
npm install
npm run build
npm start
```

## Environment variables
- `INTERNAL_JWT_SECRET` (required)
- `DEV_AUTH` (optional; dev only)
- `OIDC_ISSUER`, `OIDC_AUDIENCE`, `OIDC_JWKS_URI` (required in prod)
- `CONTRACT_REGISTRY_URL`, `ENFORCEMENT_URL`, `OBSERVATION_URL`, `LINEAGE_URL`
