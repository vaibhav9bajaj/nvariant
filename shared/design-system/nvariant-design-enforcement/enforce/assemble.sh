#!/usr/bin/env bash
set -euo pipefail
ZIPS_DIR="${1:-./zips}"
OUT_DIR="${2:-./build/assembled}"
mkdir -p "$OUT_DIR"
rm -rf "$OUT_DIR"/*
shopt -s nullglob
for z in "$ZIPS_DIR"/*.zip; do
  b="$(basename "$z" .zip)"
  d="$OUT_DIR/$b"
  mkdir -p "$d"
  unzip -q "$z" -d "$d"
  echo "unzipped $b"
done
