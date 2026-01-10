
## Environments

### Local
- docker-compose up
- Uses in-memory or local persistence

### Staging
- External Postgres
- Slack test workspace
- Limited RBAC roles

### Production
- Managed DB
- Secrets manager
- TLS termination
- Horizontal scaling behind load balancer

## Scaling Notes
- Enforcement services are stateless
- Observability + ML can scale horizontally
