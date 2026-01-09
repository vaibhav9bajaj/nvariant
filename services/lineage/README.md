# lineage

## Purpose
Internal nvariant service responsible for the **lineage** domain.

## Exposure
- **Access**: internal only (ClusterIP)
- **Called by**: `canonical-api`

## Auth
- Expects **internal JWT**
- Audience: `nvariant-internal`
- Required scopes:
  - `lineage:read`
  - `lineage:write` (if applicable)
  - `lineage:execute` (if applicable)

## Endpoints
- `GET /health/live`
- `GET /health/ready`
- `GET /` – read endpoint (requires `lineage:read`)



- `GET /graph` – read endpoint (requires `lineage:read`)

## Port
- `7006`

## Local run
```bash
npm install
npm run build
npm start
```

## Environment variables
- `INTERNAL_JWT_SECRET` (required)
- `DATABASE_URL` (required)
