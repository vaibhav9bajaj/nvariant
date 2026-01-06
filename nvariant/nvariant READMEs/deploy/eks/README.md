# nvariant on EKS (AWS Kubernetes) — minimal manifest set

This folder is a **portable** Kubernetes manifest set intended for EKS using the **AWS Load Balancer Controller** (ALB Ingress).

## Prereqs
1) An EKS cluster + kubectl configured
2) AWS Load Balancer Controller installed (IngressClass `alb`)
3) An ACM certificate that covers:
   - cp.nvariant.io
   - explorer.nvariant.io
   - api.nvariant.io
4) (Recommended) A managed Postgres (RDS). Put `DATABASE_URL` in the secret.

## Images
Build and push images to ECR, then replace:
- `<AWS_ACCOUNT_ID>`
- `<AWS_REGION>`
- `<TAG>`

Example ECR paths used:
- nvariant/control-plane-ui
- nvariant/explorer-ui
- nvariant/canonical-api
- nvariant/observability
- nvariant/enforcement-warehouse
- nvariant/advisory-ml

## Apply
```bash
kubectl apply -f 00-namespace.yaml
kubectl apply -f 01-configmap.yaml
kubectl apply -f 02-secrets.template.yaml   # replace values first (or use external secrets)
kubectl apply -f 10-deployments.yaml
kubectl apply -f 11-services.yaml
kubectl apply -f 20-ingress-alb.yaml        # replace <ACM_CERT_ARN>
kubectl apply -f 30-cronjobs.yaml           # optional
kubectl apply -f 40-pdb.yaml                # optional
```

## Notes
- API readiness/liveness assumes `GET /health` exists.
- CORS allowlist is configured via `CORS_ALLOWLIST`.
- This set assumes each container listens on `3000` (matching the dockerfiles in your deployment bundle).
