# nvariant Makefile
# Keep targets boring and reliable. Correctness > speed.
# Assumes docker compose is available as `docker compose`.

SHELL := /bin/bash
.DEFAULT_GOAL := help

COMPOSE ?= docker compose
ENV_FILE ?= .env.local

# Ports (override via env)
CONTRACT_REGISTRY_PORT ?= 7001
ENFORCEMENT_PORT ?= 7004
OBSERVATION_PORT ?= 7008

## help: Show targets
help:
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

## up: Start local dependencies and services
up:
	@if [ ! -f "$(ENV_FILE)" ]; then echo "Missing $(ENV_FILE). Create it (see docs/quickstart.md)."; exit 1; fi
	@$(COMPOSE) --env-file $(ENV_FILE) up -d --build
	@echo "Services starting..."
	@$(MAKE) health

## down: Stop local environment
down:
	@$(COMPOSE) down --remove-orphans

## logs: Tail logs
logs:
	@$(COMPOSE) logs -f --tail=200

## ps: Show running containers
ps:
	@$(COMPOSE) ps

## health: Check service health endpoints
health:
	@echo "Checking health endpoints..."
	@curl -fsS localhost:$(CONTRACT_REGISTRY_PORT)/health >/dev/null && echo "OK  zip-1 (contract registry)" || (echo "FAIL zip-1"; exit 1)
	@curl -fsS localhost:$(ENFORCEMENT_PORT)/health >/dev/null && echo "OK  zip-4 (enforcement)" || (echo "FAIL zip-4"; exit 1)
	@curl -fsS localhost:$(OBSERVATION_PORT)/health >/dev/null && echo "OK  zip-8 (observation)" || (echo "FAIL zip-8"; exit 1)
	@echo "Health checks passed."

## smoke-test: Run end-to-end smoke test (contract publish + deterministic enforcement)
smoke-test:
	@bash scripts/smoke/e2e.sh
