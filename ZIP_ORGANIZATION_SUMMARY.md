# nvariant ZIP Files Organization Summary

## Overview
All ZIP files from the nvariant project have been extracted and organized into logical temp folders based on the nvariant v2 architecture as defined in the canonical repository.

## Organized Structure

### 🔒 Enforcement Plane (`temp-enforcement/`)
**Purpose**: Deterministic enforcement across warehouse, runtime, and CI environments
- **`warehouse/`** - [`nvariant-enforcement-warehouse-frozen-v1-1767304425.zip`](nvariant/nvariant git repo/nvariant-enforcement-warehouse-frozen-v1-1767304425.zip) (ZIP 1)
- **`runtime/`** - [`nvariant-enforcement-runtime-frozen-v1-1767304626.zip`](nvariant/nvariant git repo/nvariant-enforcement-runtime-frozen-v1-1767304626.zip) (ZIP 2)  
- **`ci/`** - [`nvariant-enforcement-ci-frozen-v1-1767304750.zip`](nvariant/nvariant git repo/nvariant-enforcement-ci-frozen-v1-1767304750.zip) (ZIP 3)

### 📊 Observability Plane (`temp-observability/`)
**Purpose**: Feature exhaust, schema evolution signals, runtime behavior metrics
- **Root** - [`ZIP4-observability-v2-1767318944.zip`](nvariant/nvariant git repo/ZIP4-observability-v2-1767318944.zip) (ZIP 4 v2)

### 🤖 Intelligence Plane (`temp-ml-advisory/`)
**Purpose**: ML advisory system and heuristic baseline fallback
- **`system-v2/`** - [`ZIP8-ml-system-v2-1767318944.zip`](nvariant/nvariant git repo/ZIP8-ml-system-v2-1767318944.zip) (ZIP 8 v2)
- **`baseline/`** - [`nvariant-ml-advisory-frozen-v1-1767304918.zip`](nvariant/nvariant git repo/nvariant-ml-advisory-frozen-v1-1767304918.zip) (ZIP 5)

### 🖥️ Interaction Plane (`temp-ui/`)
**Purpose**: User interfaces for exploration and control
- **`explorer/`** - [`nvariant-explorer-ui-frozen-v1-1767305190.zip`](nvariant/nvariant git repo/nvariant-explorer-ui-frozen-v1-1767305190.zip) (ZIP 6)
- **`control-plane/`** - [`ZIP_07_CONTROL_PLANE_UI_FINAL.zip`](nvariant/nvariant git repo/ZIP_07_CONTROL_PLANE_UI_FINAL.zip) (ZIP 7 v2)

### ⚙️ Operations Plane (`temp-deployment-ops/`)
**Purpose**: Deployment, operations, and hardening
- **`main/`** - [`nvariant-deployment-ops-frozen-v1-1767305718.zip`](nvariant/nvariant git repo/nvariant-deployment-ops-frozen-v1-1767305718.zip) (ZIP 9)
- **`hardening/`** - [`ZIP_12_OPS_HARDENING_FINAL.zip`](nvariant/nvariant git repo/ZIP_12_OPS_HARDENING_FINAL.zip) (ZIP 12)

### 📦 Miscellaneous (`temp-misc/`)
**Purpose**: Additional components and design materials
- **`design-wrapper/`** - [`nvariant_design_enforcement_wrapper.zip`](nvariant/nvariant git repo/nvariant_design_enforcement_wrapper.zip)
- **`advisory-ml-final/`** - [`ZIP_10_ADVISORY_ML_VERTICAL_FINAL.zip`](nvariant/nvariant git repo/ZIP_10_ADVISORY_ML_VERTICAL_FINAL.zip)
- **`advisory-ml-ultimate/`** - [`ZIP_10_ADVISORY_ML_VERTICAL_ULTIMATE.zip`](nvariant/nvariant git repo/ZIP_10_ADVISORY_ML_VERTICAL_ULTIMATE.zip)

## Architecture Compliance

This organization follows the nvariant v2 architecture principles:

### Data Flow
```
Enforcement Plane (ZIP 1-3) → Observability Plane (ZIP 4 v2) → Intelligence Plane (ZIP 8 v2)
                                                              ↘
                                                               Intelligence Plane (ZIP 5 fallback)
Intelligence Plane → Interaction Plane (ZIP 7 v2) → Human Decisions
```

### Key Constraints Maintained
- **Enforcement never calls ML** - Enforcement plane is isolated
- **ML never blocks or enforces** - Intelligence plane is advisory only
- **Humans are the only bridge between ML and contracts** - Control via interaction plane

## Existing Legacy Structure
The following temp folders were already present and contain related components:
- [`temp-control-plane/`](temp-control-plane/) - Control plane UI components
- [`temp-warehouse/`](temp-warehouse/) - Warehouse enforcement components

## Canonical Definition
The authoritative system definition is available in:
- [`nvariant-canonical-v2-extracted/`](nvariant-canonical-v2-extracted/) - Contains architecture, governance, and bootstrap documentation

## Next Steps
1. Review extracted contents in each temp folder
2. Follow [`BOOTSTRAP.md`](nvariant-canonical-v2-extracted/BOOTSTRAP.md) for deployment
3. Access UIs at:
   - Explorer UI: http://localhost:5173
   - Control Plane UI: http://localhost:5174