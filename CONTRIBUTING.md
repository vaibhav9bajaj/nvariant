# Contributing to nvariant

We welcome contributions to the nvariant project! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm 9+
- Docker and Docker Compose
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nvariant.git
   cd nvariant
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start the development environment:
   ```bash
   make up
   ```

## 📝 Development Guidelines

### Code Standards

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Write meaningful commit messages using conventional commits
- Add tests for new functionality
- Update documentation as needed

### Conventional Commits

We use conventional commits for consistent commit messages:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add contract validation endpoint"
git commit -m "fix: resolve memory leak in lineage tracker"
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Pull Request Process

1. Create a feature branch from `master`
2. Make your changes following the guidelines above
3. Add tests for new functionality
4. Ensure all tests pass: `pnpm test`
5. Ensure code is properly formatted: `pnpm format`
6. Ensure linting passes: `pnpm lint`
7. Update documentation if needed
8. Create a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write unit tests for business logic
- Write integration tests for API endpoints
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

## 📖 Documentation

### Code Documentation

- Use JSDoc comments for functions and classes
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes

### API Documentation

- Use OpenAPI/Swagger for REST APIs
- Document all endpoints, parameters, and responses
- Provide example requests and responses

## 🚀 Deployment

### Local Testing

```bash
# Build and test locally
make verify
```

### Environment Variables

- Never commit sensitive data
- Use `.env.example` as a template
- Document new environment variables in README

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment information (OS, Node version, etc.)
- Relevant logs or error messages

## 💡 Feature Requests

For feature requests, please include:

- Clear description of the proposed feature
- Use case and motivation
- Potential implementation approach
- Breaking changes (if any)

## 📚 Resources

- [Project README](README.md)
- [API Documentation](docs/api/)
- [Architecture Guide](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

## 📞 Getting Help

- Check existing [Issues](https://github.com/vaibhav9bajaj/nvariant/issues)
- Start a [Discussion](https://github.com/vaibhav9bajaj/nvariant/discussions)
- Review the [Documentation](docs/)

Thank you for contributing to nvariant! 🎉
