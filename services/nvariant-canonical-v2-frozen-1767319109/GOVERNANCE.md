
## Governance Model (v2)

### Responsibility
- Producers, consumers, and approvers are derived from lineage.
- Notification routing is automatic.

### Change Semantics
- Breaking changes are human decisions.
- ML may recommend but never decide.

### Advisory Contract
ML outputs are strictly limited to:
- Risk scores
- Explanations
- Recommendations
- Forecasts

ML outputs may not:
- Emit BLOCK / WARN / ALLOW
- Modify contracts
- Bypass approval windows
