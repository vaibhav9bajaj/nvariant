SHELL := /bin/bash

.PHONY: help
help:
	@echo "Targets:"
	@echo "  up                 Build and run locally (docker compose)"
	@echo "  down               Stop local stack"
	@echo "  build-images       Build all images locally (docker compose build)"
	@echo "  deploy-eks         Apply EKS manifests in deploy/eks"
	@echo "  delete-eks         Delete EKS manifests in deploy/eks"
	@echo "  kube-ns            Create namespace (if manifest exists)"
	@echo "  kube-context       Show current kubectl context"

.PHONY: up
up:
	docker compose up --build

.PHONY: down
down:
	docker compose down -v

.PHONY: build-images
build-images:
	docker compose build

.PHONY: kube-context
kube-context:
	kubectl config current-context

# If you have deploy/eks/00-namespace.yaml, this will create it; otherwise it's a no-op.
.PHONY: kube-ns
kube-ns:
	@if [ -f deploy/eks/00-namespace.yaml ]; then kubectl apply -f deploy/eks/00-namespace.yaml; else echo "deploy/eks/00-namespace.yaml not found; skipping"; fi

.PHONY: deploy-eks
deploy-eks:
	kubectl apply -f deploy/eks

.PHONY: delete-eks
delete-eks:
	kubectl delete -f deploy/eks --ignore-not-found
.PHONY: lint fmt typecheck test smoke
PKG_MGR := $(shell command -v pnpm >/dev/null 2>&1 && echo pnpm || echo npm)

lint:
	@$(PKG_MGR) -r lint || true

fmt:
	@$(PKG_MGR) -r format || true

typecheck:
	@$(PKG_MGR) -r typecheck || true

test:
	@$(PKG_MGR) -r test || true

smoke:
	bash tools/smoke.sh

.PHONY: verify
verify:
	@echo "==> Building images"
	docker compose build
	@echo "==> Starting stack"
	docker compose up -d
	@echo "==> Running smoke"
	bash tools/smoke.sh
	@echo "==> Tearing down"
	docker compose down -v
	@echo "Verify complete."
