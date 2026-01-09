# enforcement

## Purpose
Internal nvariant service responsible for the **enforcement** domain.

## Exposure
- **Access**: internal only (ClusterIP)
- **Called by**: `canonical-api`

## Auth
- Expects **internal JWT**
- Audience: `nvariant-internal`
- Required scopes:
  - `enforcement:read`
  - `enforcement:write` (if applicable)
  - `enforcement:execute` (if applicable)

## Endpoints
- `GET /health/live`
- `GET /health/ready`
- `GET /` – read endpoint (requires `enforcement:read`)

- `POST /run` – execute endpoint (requires `enforcement:execute`)



## Port
- `7004`

## Local run
```bash
npm install
npm run build
npm start
```

## Environment variables
- `INTERNAL_JWT_SECRET` (required)
- `DATABASE_URL` (required)
