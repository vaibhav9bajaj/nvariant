# Deploy artifacts included

This monorepo includes the production-grade deploy artifacts under `deploy/` and CI workflows under `.github/`.
These artifacts were previously validated against service directories named `services/canonical-api`, `services/contract-registry`,
`services/enforcement`, `services/observation`, `services/lineage`, and UI apps under `apps/explorer-ui` and `apps/control-plane-ui`.

Since the canonical monorepo merge preserved each frozen subsystem as its own folder under `apps/`/`services/`/`packages/`,
you may need to either:
1) create thin wrapper folders matching the expected names, or
2) update CI build contexts and any Helm/Kustomize overlays to point at the merged subsystem paths.

Nothing was deleted; this is purely a path normalization step.
