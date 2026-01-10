
## System Architecture (v2)

### Enforcement Plane (Deterministic)
- ZIP 1: Warehouse Enforcement
- ZIP 2: Runtime Enforcement
- ZIP 3: CI Enforcement

### Observability & Signal Plane
- ZIP 4 v2: Feature Exhaust
  - Schema evolution signals
  - Runtime behavior metrics
  - Governance outcomes
  - Stability indicators

### Intelligence Plane (Advisory)
- ZIP 8 v2: ML Advisory System
- ZIP 5: Heuristic Baseline (fallback only)

### Interaction Plane
- ZIP 6: Explorer UI
- ZIP 7 v2: Control Plane UI

### Ops Plane
- ZIP 9: Deployment & Operations

---

## Data Flow

ZIP 1–3  →  ZIP 4 v2  →  ZIP 8 v2
                      ↘
                       ZIP 5 (fallback)

ZIP 8 v2 + ZIP 5  →  ZIP 7 v2 (human interpretation only)

### Explicit Constraints
- Enforcement never calls ML
- ML never blocks or enforces
- Humans are the only bridge between ML and contracts
