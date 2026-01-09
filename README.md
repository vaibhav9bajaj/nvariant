# nvariant V2 — source-of-truth (FULL)

This is the **deepest runnable V2 snapshot** in a single archive:
- Backend services: canonical-api, contract-registry, enforcement, observation, lineage
- UI applications: explorer-ui, control-plane-ui (React + Vite)
- Auth: OIDC (Auth0 or Cognito) + RBAC. In dev: DEV_AUTH mode uses /dev/token.
- Production deploy: EKS manifests (ALB Ingress, IRSA hooks, Secrets, HPA, PDB, NetworkPolicy)
- CI: build/push images per subsystem

## Local run (dev auth)
```bash
docker compose up --build
```
- API: http://localhost:3000
- Explorer: http://localhost:3100
- Control Plane: http://localhost:3200

Dev auth mode:
- canonical-api runs with DEV_AUTH=1
- UIs run with VITE_DEV_AUTH=1 and fetch token from `/dev/token`

## Production (OIDC)
Set secrets in `deploy/eks/02-secrets.template.yaml` (copy to real Secret), then:
```bash
kubectl apply -f deploy/eks
```

### Auth0 / Cognito requirements
You must configure your IdP to include roles:
- Cognito: use Groups -> `cognito:groups`
- Auth0: add a custom namespaced claim `https://nvariant.io/roles`
