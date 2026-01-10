
# nvariant — Canonical Repository (v2)

This repository is the **authoritative system-of-systems definition** for nvariant.

It does not duplicate subsystem code.
It declares **what exists**, **what is authoritative**, and **how subsystems interact**.

## Authoritative Subsystems
- ZIP 1–3: Deterministic Enforcement (unchanged)
- ZIP 4 v2: Observability + Feature Exhaust
- ZIP 5: Baseline Advisory (fallback only)
- ZIP 7 v2: Control Plane UI (ML explanations surfaced)
- ZIP 8 v2: ML Advisory System (supervised, explainable)
- ZIP 9: Deployment & Ops

## Non-Negotiable Principle
**ML is advisory only.**
ML outputs can never influence enforcement decisions.
