#!/usr/bin/env bash
set -euo pipefail

# nvariant E2E Smoke Test
# Goal: publish a contract (ZIP-1) and invoke enforcement twice (ZIP-4) to prove determinism.
#
# Assumed endpoints (adjust if your implementation differs):
# Contract Registry:
#   POST /contracts
#   PUT  /contracts/{id}/draft
#   POST /contracts/{id}/draft/validate
#   POST /contracts/{id}/publish
# Enforcement:
#   POST /enforce

CONTRACT_HOST="${CONTRACT_HOST:-http://localhost:7001}"
ENFORCEMENT_HOST="${ENFORCEMENT_HOST:-http://localhost:7004}"
TENANT_ID="${NV_TENANT_ID:-local}"

have_jq=1
if ! command -v jq >/dev/null 2>&1; then
  have_jq=0
  command -v python3 >/dev/null 2>&1 || { echo "Need jq or python3 for JSON parsing"; exit 1; }
fi

json_get() {
  local expr="$1"
  if [ "$have_jq" -eq 1 ]; then
    jq -r "$expr"
  else
    python3 - "$expr" <<'PY'
import sys, json
expr = sys.argv[1].strip().lstrip('.')
data = json.load(sys.stdin)
cur = data
for p in expr.split('.'):
  if not p: 
    continue
  cur = cur.get(p) if isinstance(cur, dict) else None
  if cur is None:
    break
print("" if cur is None else cur)
PY
  fi
}

echo "==> Health checks"
curl -fsS "$CONTRACT_HOST/health" >/dev/null || { echo "Contract Registry not healthy at $CONTRACT_HOST"; exit 1; }
curl -fsS "$ENFORCEMENT_HOST/health" >/dev/null || { echo "Enforcement not healthy at $ENFORCEMENT_HOST"; exit 1; }

echo "==> Create contract"
create_payload='{
  "name": "smoke_contract_table_orders",
  "type": "TABLE",
  "resource_kind": "TABLE",
  "resource_ref": "local.public.orders",
  "owner_team": "smoke-team",
  "owner_oncall": "smoke-oncall",
  "tags": ["smoke", "e2e"]
}'

create_resp="$(curl -fsS -X POST "$CONTRACT_HOST/contracts"   -H "Content-Type: application/json"   -H "X-Tenant-Id: '"$TENANT_ID"'"   -d "$create_payload")"

contract_id="$(echo "$create_resp" | json_get '.contract_id')"
if [ -z "$contract_id" ]; then
  echo "Could not parse contract_id. Response:"
  echo "$create_resp"
  exit 1
fi
echo "    contract_id=$contract_id"

echo "==> Update draft"
draft_def='{
  "meta": {
    "name": "smoke_contract_table_orders",
    "description": "Smoke test contract: validates a null rate metric deterministically.",
    "owner": { "team": "smoke-team", "oncall": "smoke-oncall" },
    "tags": ["smoke", "e2e"],
    "created_from": "smoke-test"
  },
  "binding": {
    "resource_kind": "TABLE",
    "resource_ref": "local.public.orders"
  },
  "schema_rules": [
    {
      "rule_id": "schema_required_columns",
      "type": "REQUIRED_COLUMNS",
      "params": { "columns": ["order_id", "created_at"] },
      "severity": "FAIL"
    }
  ],
  "semantic_rules": [
    {
      "rule_id": "null_rate_order_id_under_1pct",
      "type": "METRIC_THRESHOLD",
      "params": {
        "metric": "null_rate.order_id",
        "operator": "<=",
        "threshold": 0.01
      },
      "severity": "FAIL"
    }
  ]
}'

update_resp="$(curl -fsS -X PUT "$CONTRACT_HOST/contracts/$contract_id/draft"   -H "Content-Type: application/json"   -H "X-Tenant-Id: '"$TENANT_ID"'"   -d '{"definition_json": '"$draft_def"'}')"

draft_hash="$(echo "$update_resp" | json_get '.definition_hash')"
if [ -z "$draft_hash" ]; then
  echo "Could not parse definition_hash. Response:"
  echo "$update_resp"
  exit 1
fi
echo "    draft_hash=$draft_hash"

echo "==> Validate draft"
val_resp="$(curl -fsS -X POST "$CONTRACT_HOST/contracts/$contract_id/draft/validate"   -H "Content-Type: application/json"   -H "X-Tenant-Id: '"$TENANT_ID"'")"

if [ "$have_jq" -eq 1 ]; then
  err_count="$(echo "$val_resp" | jq '.errors | length')"
else
  err_count="$(python3 - <<'PY'
import json,sys
d=json.load(sys.stdin)
print(len(d.get("errors",[])))
PY
<<<"$val_resp")"
fi

if [ "$err_count" != "0" ]; then
  echo "Draft validation errors:"
  echo "$val_resp"
  exit 1
fi
echo "    validation OK"

echo "==> Publish"
publish_payload='{
  "expected_hash": "'"$draft_hash"'",
  "changelog": "Smoke test publish: initial contract version."
}'

pub_resp="$(curl -fsS -X POST "$CONTRACT_HOST/contracts/$contract_id/publish"   -H "Content-Type: application/json"   -H "X-Tenant-Id: '"$TENANT_ID"'"   -d "$publish_payload")"

published_version="$(echo "$pub_resp" | json_get '.version')"
if [ -z "$published_version" ]; then
  published_version="$(echo "$pub_resp" | json_get '.published_version')"
fi
if [ -z "$published_version" ]; then
  echo "WARN: Could not parse published version; assuming 1"
  published_version="1"
fi
echo "    published_version=$published_version"

echo "==> Enforce twice (determinism)"
enforce_payload='{
  "tenant_id": "'"$TENANT_ID"'",
  "contract_id": "'"$contract_id"'",
  "contract_version": '"$published_version"',
  "trigger": { "type": "CI", "ref": "smoke-test" },
  "mode": "OBSERVE",
  "inputs": {
    "metrics": { "null_rate.order_id": 0.0 },
    "schema_snapshot": { "columns": ["order_id", "created_at", "amount"] }
  }
}'

run1="$(curl -fsS -X POST "$ENFORCEMENT_HOST/enforce" -H "Content-Type: application/json" -d "$enforce_payload")"
run2="$(curl -fsS -X POST "$ENFORCEMENT_HOST/enforce" -H "Content-Type: application/json" -d "$enforce_payload")"

outcome1="$(echo "$run1" | json_get '.outcome')"
outcome2="$(echo "$run2" | json_get '.outcome')"

if [ -z "$outcome1" ] || [ -z "$outcome2" ]; then
  echo "Could not parse outcomes."
  echo "run1=$run1"
  echo "run2=$run2"
  exit 1
fi

echo "    outcome1=$outcome1"
echo "    outcome2=$outcome2"

if [ "$outcome1" != "$outcome2" ]; then
  echo "FAIL: Non-deterministic outcomes."
  exit 1
fi

echo "==> Optional violation path"
violate_payload='{
  "tenant_id": "'"$TENANT_ID"'",
  "contract_id": "'"$contract_id"'",
  "contract_version": '"$published_version"',
  "trigger": { "type": "CI", "ref": "smoke-test-violation" },
  "mode": "OBSERVE",
  "inputs": {
    "metrics": { "null_rate.order_id": 0.5 },
    "schema_snapshot": { "columns": ["order_id", "created_at", "amount"] }
  }
}'

vio="$(curl -fsS -X POST "$ENFORCEMENT_HOST/enforce" -H "Content-Type: application/json" -d "$violate_payload")"
vio_outcome="$(echo "$vio" | json_get '.outcome')"
echo "    violation_outcome=$vio_outcome (expected WARN/FAIL depending on engine mapping)"

echo ""
echo "✅ Smoke test complete."
echo "   - Contract created + published"
echo "   - Enforcement deterministic"
echo "   - Violation path exercised"
echo ""
