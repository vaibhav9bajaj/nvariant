# observation

## Purpose
Internal nvariant service responsible for the **observation** domain.

## Exposure
- **Access**: internal only (ClusterIP)
- **Called by**: `canonical-api`

## Auth
- Expects **internal JWT**
- Audience: `nvariant-internal`
- Required scopes:
  - `observation:read`
  - `observation:write` (if applicable)
  - `observation:execute` (if applicable)

## Endpoints
- `GET /health/live`
- `GET /health/ready`
- `GET /` – read endpoint (requires `observation:read`)


- `POST /events` – write endpoint (requires `observation:write`)


## Port
- `7008`

## Local run
```bash
npm install
npm run build
npm start
```

## Environment variables
- `INTERNAL_JWT_SECRET` (required)
- `DATABASE_URL` (required)
