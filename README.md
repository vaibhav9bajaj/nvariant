# nvariant V2 Canonical Monorepo

[![Build Status](https://github.com/vaibhav9bajaj/nvariant/workflows/CI/badge.svg)](https://github.com/vaibhav9bajaj/nvariant/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A comprehensive data contract enforcement and observability platform built as a modern microservices monorepo.

## 🏗️ Architecture Overview

nvariant is a data governance platform that provides contract enforcement, lineage tracking, and ML-powered advisory recommendations across your data infrastructure.

### Core Components

- **Contract Registry**: Central repository for data contracts and schemas
- **Enforcement Engine**: Runtime validation and policy enforcement
- **Lineage Tracker**: Data flow mapping and dependency analysis  
- **ML Advisory**: Intelligent recommendations and drift detection
- **Observability Suite**: Monitoring, alerting, and performance tracking

## 📁 Repository Structure

```
nvariant/
├── apps/                    # Frontend applications
│   ├── control-plane-ui/    # Administrative dashboard
│   └── explorer-ui/         # Data exploration interface
├── services/                # Backend microservices
│   ├── canonical-api/       # Core API gateway
│   ├── contract-registry/   # Contract management service
│   ├── enforcement/         # Policy enforcement engine
│   ├── lineage/            # Data lineage tracking
│   └── observation/        # Observability and monitoring
├── packages/               # Shared libraries and utilities
├── tools/                 # Development and deployment tools
├── deploy/               # Kubernetes deployment manifests
├── infrastructure/       # Infrastructure as code
├── shared/              # Shared utilities and design system
└── docs/               # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm 9+
- Docker and Docker Compose
- kubectl (for Kubernetes deployment)

### Local Development

```bash
# Install dependencies
pnpm install

# Start all services locally
make up

# Run tests
make test

# Build all packages
pnpm build
```

### Development Commands

```bash
# Package Management
pnpm install              # Install all dependencies
pnpm build                # Build all packages
pnpm test                 # Run all tests
pnpm lint                 # Lint all packages
pnpm format               # Format all code

# Docker Operations
make up                   # Start local stack
make down                 # Stop local stack
make build-images         # Build all Docker images
make verify              # Full verification pipeline

# Kubernetes Deployment
make deploy-eks          # Deploy to EKS
make delete-eks          # Remove EKS deployment
make kube-context        # Show current context
```

## 🔧 Configuration

### Environment Setup

1. Copy environment template:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment variables
3. Start the development stack:
   ```bash
   make up
   ```

### Service Configuration

Each service can be configured via:
- Environment variables
- Configuration files in `configs/`
- Kubernetes ConfigMaps (for deployed environments)

## 📖 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/api/)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

### Development Guidelines

- Follow the established coding standards
- Write tests for new functionality
- Update documentation as needed
- Use conventional commit messages

## 🚀 Deployment

### Local Development
```bash
make up
```

### Kubernetes
```bash
make deploy-eks
```

### Production
See [Deployment Guide](docs/DEPLOYMENT.md) for production deployment instructions.

## 📊 Monitoring

- **Health Checks**: Available at `/health` for all services
- **Metrics**: Prometheus metrics at `/metrics`
- **Logs**: Structured JSON logging with correlation IDs
- **Tracing**: Distributed tracing with OpenTelemetry

## 🛡️ Security

- All services implement authentication and authorization
- Regular security audits and dependency scanning
- Container image scanning in CI/CD
- RBAC policies for Kubernetes deployment

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- [GitHub Issues](https://github.com/vaibhav9bajaj/nvariant/issues)
- [Discussion Forum](https://github.com/vaibhav9bajaj/nvariant/discussions)
- [Documentation](docs/)

---

**Made with ❤️ by the nvariant team**
