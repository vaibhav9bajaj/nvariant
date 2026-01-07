
# nvariant – Warehouse Enforcement Engine (Frozen v1.0)

This service enforces schema/contract compatibility at the data-warehouse layer.

## Supported warehouses (v1.0)
- Snowflake (first-class)
- BigQuery (first-class seam)
- Redshift (first-class seam)

## What this engine does
- Snapshots table schemas from warehouse system catalogs
- Persists versioned snapshots (Postgres JSONB)
- Computes deterministic diffs
- Classifies compatibility using an explicit matrix (allow/warn/block)
- Emits consumer impact metadata (count-based input)
- Persists state only when change is allowed (or warn, per policy)

## Safety & performance safeguards
- Schema hashing and "no-op" short circuit (skip diff/classify when identical)
- Max columns guardrail (prevents massive schemas from blowing memory)
- Deterministic normalization (stable ordering of columns)
- Bounded change lists and reason strings

## Running tests
```bash
npm test
```

## Migrations
See `migrations/001_schema_snapshots.sql`.
