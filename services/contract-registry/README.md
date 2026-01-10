# contract-registry

## Purpose
Internal nvariant service responsible for the **registry** domain.

## Exposure
- **Access**: internal only (ClusterIP)
- **Called by**: `canonical-api`

## Auth
- Expects **internal JWT**
- Audience: `nvariant-internal`
- Required scopes:
  - `registry:read`
  - `registry:write` (if applicable)
  - `registry:execute` (if applicable)

## Endpoints
- `GET /health/live`
- `GET /health/ready`
- `GET /` – read endpoint (requires `registry:read`)
- `POST /contracts` – write endpoint (requires `registry:write`)




## Port
- `7001`

## Local run
```bash
npm install
npm run build
npm start
```

## Environment variables
- `INTERNAL_JWT_SECRET` (required)
- `DATABASE_URL` (required)
