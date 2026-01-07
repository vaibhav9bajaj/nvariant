#!/usr/bin/env bash
set -euo pipefail
ROOT=${1:-./build/assembled}
SRC="$(cd "$(dirname "$0")/.." && pwd)/design-contract/contract.css"
LINE="  <link rel=\"stylesheet\" href=\"contract.css\" />"
find "$ROOT" -type f \( -name index.html -o -name "*.html" \) -print0 | while IFS= read -r -d "" f; do
  d=$(dirname "$f")
  cp -f "$SRC" "$d/contract.css" 2>/dev/null || true
  grep -q "contract.css" "$f" && continue
  if grep -q "</head>" "$f"; then
    tmp="${f}.nvtmp"
    awk -v l="$LINE" "{if(\$0~/<\\/head>/){print l} print \$0}" "$f" > "$tmp"
    mv "$tmp" "$f"
  fi
done
