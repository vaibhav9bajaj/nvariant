#!/usr/bin/env bash
set -euo pipefail
ROOT=${1:-./build/assembled}
OUT=${2:-./reports}
mkdir -p "$OUT"
R="$OUT/remediation_$(date +%Y%m%d_%H%M%S).txt"
echo "remediation" > "$R"
find "$ROOT" -type f \( -name "*.css" -o -name "*.html" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d "" f; do
  perl -i -pe "s/(linear-gradient|radial-gradient)\([^\)]*\)/none/g" "$f" 2>/dev/null || true
  perl -i -pe "s/#0A1220/var(--nv-ink)/ig; s/#141A23/var(--nv-charcoal)/ig; s/#202A36/var(--nv-slate)/ig; s/#E3E7EC/var(--nv-border)/ig; s/#2F7D6B/var(--nv-ok)/ig; s/#B07A2A/var(--nv-warn)/ig; s/#8E2F3A/var(--nv-error)/ig; s/#2E5B9A/var(--nv-info)/ig" "$f" 2>/dev/null || true
done
echo "wrote $R" >> "$R"
