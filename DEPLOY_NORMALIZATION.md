# Deploy Path Normalization

This repo contains the original frozen subsystem folders (by ZIP name) plus normalized paths required by deploy/ and CI.

Normalized paths (used by deploy/ and CI):
- apps/explorer-ui  (copied from apps/nvariant-explorer-ui-frozen-*)
- apps/control-plane-ui (copied from apps/ZIP_07_CONTROL_PLANE_UI_FINAL/apps/control-plane-ui)
- services/enforcement (copied from services/nvariant-enforcement-runtime-frozen-*)
- services/canonical-api, services/contract-registry, services/observation, services/lineage
  (copied from the previously deploy-ready V2 baseline to satisfy build contexts)

No frozen subsystem content was removed.
