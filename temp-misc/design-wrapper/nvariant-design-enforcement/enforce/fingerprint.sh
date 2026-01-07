#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-./build/assembled}"
OUT="${2:-./reports}"
mkdir -p "$OUT"
R="$OUT/ui_fingerprint_$(date +%Y%m%d_%H%M%S).txt"
echo "UI Fingerprint" | tee "$R"
for d in "$ROOT"/*; do
  [ -d "$d" ] || continue
  n=$(basename "$d")
  t=unknown
  if [ -f "$d/vite.config.ts" ] || [ -f "$d/vite.config.js" ]; then t=vite; fi
  if [ -f "$d/index.html" ] && [ "$t" = unknown ]; then t=static; fi
  echo "- $n: $t" | tee -a "$R"
done
