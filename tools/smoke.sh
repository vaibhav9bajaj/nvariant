#!/usr/bin/env bash
set -euo pipefail
BASE="${BASE_URL:-http://localhost:3000}"
curl -fsS "$BASE/health/live" >/dev/null
curl -fsS "$BASE/health/ready" >/dev/null
echo "OK"
