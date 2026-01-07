#!/usr/bin/env bash
set -euo pipefail
MODE=${1:-warn}
ROOT=./build/assembled
OUT=./reports
mkdir -p "$OUT"
R="$OUT/design_scan_${MODE}_$(date +%Y%m%d_%H%M%S).txt"
fail=0
echo "scan $MODE" > "$R"
hex=$(grep -RIn --exclude-dir=node_modules -E "#[0-9A-Fa-f]{6}\\b" "$ROOT" || true)
if [ -n "$hex" ]; then echo "HEX" >> "$R"; echo "$hex" >> "$R"; fail=1; fi
grad=$(grep -RIn --exclude-dir=node_modules -E "linear-gradient\\(|radial-gradient\\(" "$ROOT" || true)
if [ -n "$grad" ]; then echo "GRAD" >> "$R"; echo "$grad" >> "$R"; fail=1; fi
font=$(grep -RIn --exclude-dir=node_modules -E "font-family\s*:" "$ROOT" | grep -vi Inter || true)
if [ -n "$font" ]; then echo "FONT" >> "$R"; echo "$font" >> "$R"; fail=1; fi
echo "report $R" >> "$R"
if [ "$MODE" = strict ] && [ "$fail" -eq 1 ]; then exit 1; fi
exit 0
