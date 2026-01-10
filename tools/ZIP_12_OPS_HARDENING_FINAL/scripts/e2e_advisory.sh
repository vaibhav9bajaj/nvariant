#!/usr/bin/env bash
set -e
curl -sf http://localhost:8081/health
curl -sf http://localhost:8080/health
curl -sf -X POST http://localhost:8081/advisory/runs
curl -sf http://localhost:8081/advisory/recommendations
