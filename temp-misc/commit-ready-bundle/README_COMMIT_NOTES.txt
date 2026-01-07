These files are ready to commit.

Copy into your repo root:
  - Makefile
  - .github/PULL_REQUEST_TEMPLATE.md
  - scripts/smoke/e2e.sh

Then run:
  make up
  make smoke-test

If your endpoints differ, edit variables at top of scripts/smoke/e2e.sh.

Added docker templates:
  - docker/Dockerfile.node
  - docker/Dockerfile.go
  - docker/README.md
And per-ZIP placeholders + .dockerignore under zip-1/ zip-4/ zip-8/ zip-6/
