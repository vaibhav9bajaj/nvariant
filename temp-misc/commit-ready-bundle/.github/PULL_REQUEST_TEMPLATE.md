<!--
nvariant Pull Request Template
- Keep this filled in. Missing sections slow reviews.
- Blueprints > Implementation docs > Execution manuals.
-->

## PR Title
`[ZIP-x] <concise description>`

## Summary
What this PR changes, in 3–6 bullets max.

- 
- 
- 

## Scope
**ZIPs touched:**
- ZIP 

**Explicitly out of scope:**
- 

## Invariants & Authority (must check)
- [ ] Published contracts remain immutable (no edit path, no DB updates, no “force” flags)
- [ ] Enforcement remains deterministic (same input → same output; ordering stable; no time-based logic)
- [ ] Observation remains advisory only (no auto-apply; no auto-publish)
- [ ] No automation mutates authority (publish requires explicit human action + changelog)
- [ ] Lineage never influences enforcement (context only)
- [ ] ML never affects execution or blocking (advisory only)

**Notes (if any invariant is closely interacted with):**
- 

## How to Test (copy/paste)
```bash
# Bring up deps + services
make up

# Health checks
make health

# Run smoke test (publishes a contract, enforces twice to prove determinism)
make smoke-test
```

**Expected outcomes:**
- 
- 

## Screenshots / Logs (optional)
- 

## Known Gaps / Follow-ups
- 

## Reviewer Notes
Call out anything subtle (boundary decisions, tradeoffs, migrations, non-obvious configs).
- 
