# nvariant

**Data Contract Enforcement & Advisory System**

nvariant is a comprehensive data governance platform that provides deterministic contract enforcement with intelligent ML-powered advisory capabilities. It maintains strict separation between enforcement decisions and advisory insights, ensuring governance reliability while enabling intelligent recommendations.

## 🏗️ Architecture

nvariant follows a clean architectural pattern with distinct planes:

- **🔒 Enforcement Plane** - Deterministic contract enforcement (warehouse, runtime, CI)
- **📊 Observability Plane** - Feature exhaust and schema evolution monitoring  
- **🤖 Intelligence Plane** - ML advisory system with heuristic fallback
- **🖥️ Interaction Plane** - Explorer and control plane user interfaces
- **⚙️ Operations Plane** - Deployment, operations, and hardening

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for UI development)
- Python 3.9+ (for ML services)

### Local Development
```bash
# Clone the repository
git clone https://github.com/vaibhav9bajaj/nvariant
cd nvariant

# Start all services
docker-compose up

# Access the interfaces
# Explorer UI: http://localhost:5173
# Control Plane UI: http://localhost:5174
```

### Deployment
```bash
# See deployment documentation
docs/deployment/
```

## 📁 Project Structure

```
nvariant/
├── services/           # All microservices
│   ├── enforcement/    # Contract enforcement (ZIP 1-3)
│   ├── observability/  # Feature monitoring (ZIP 4 v2)
│   ├── ml-advisory/    # ML system & baseline (ZIP 5, 8 v2)
│   └── ui/            # User interfaces (ZIP 6-7)
├── infrastructure/     # Deployment & operations
├── docs/              # All documentation
├── shared/            # Shared utilities & design system
└── tools/             # Development tools & migrations
```

## 🎯 Core Principles

### ML is Advisory Only
- **Enforcement never calls ML** - Clean separation maintained
- **ML never blocks or enforces** - Advisory outputs only
- **Humans bridge ML and contracts** - All decisions require human approval

### Governance First
- Deterministic enforcement across all environments
- Automatic notification routing based on lineage
- Breaking changes require explicit human decisions

## 🛠️ Development

### Services
Each service is independently deployable:

- **[`services/enforcement/warehouse`](services/enforcement/warehouse/)** - Data warehouse contract enforcement
- **[`services/enforcement/runtime`](services/enforcement/runtime/)** - Runtime data pipeline enforcement  
- **[`services/enforcement/ci`](services/enforcement/ci/)** - CI/CD contract validation
- **[`services/observability`](services/observability/)** - Schema evolution monitoring
- **[`services/ml-advisory/baseline`](services/ml-advisory/baseline/)** - Heuristic advisory fallback
- **[`services/ml-advisory/system-v2`](services/ml-advisory/system-v2/)** - ML advisory system
- **[`services/ui/explorer`](services/ui/explorer/)** - Data exploration interface
- **[`services/ui/control-plane`](services/ui/control-plane/)** - Governance control interface

### Infrastructure
- **[`infrastructure/docker`](infrastructure/docker/)** - Container definitions
- **[`infrastructure/hardening`](infrastructure/hardening/)** - Security & operations hardening
- **[`infrastructure/k8s`](infrastructure/k8s/)** - Kubernetes manifests (future)

## 📚 Documentation

- **[Architecture Overview](docs/architecture/)** - System architecture and principles
- **[Implementation Guides](docs/implementation/)** - Service implementation details  
- **[Deployment Guide](docs/deployment/)** - Deployment and operations
- **[API Documentation](docs/api/)** - API specifications (future)

## 🤝 Contributing

1. Follow the established service patterns
2. Maintain architectural separation (enforcement vs advisory)
3. Update documentation for any architectural changes
4. Ensure all tests pass before submitting

## 📄 License

[License information to be added]

## 🔗 Related

- [Design System](shared/design-system/) - UI/UX design enforcement
- [Canonical Architecture](docs/architecture/) - Authoritative system definition
- [Migration Tools](tools/migrations/) - Database schema management

---

**⚠️ Important**: This system enforces data contracts deterministically. ML advisory outputs are informational only and never influence enforcement decisions.