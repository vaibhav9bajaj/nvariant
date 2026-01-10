
## Bootstrapping nvariant (v2)

1. Unzip authoritative ZIPs into sibling directories:
   - enforcement (ZIP 1–3)
   - observability (ZIP 4 v2)
   - ml-system (ZIP 8 v2)
   - baseline-advisory (ZIP 5)
   - explorer-ui (ZIP 6)
   - control-plane-ui (ZIP 7 v2)
   - deployment-ops (ZIP 9)

2. From deployment-ops:
   docker-compose up

3. Access:
   - Explorer UI: http://localhost:5173
   - Control Plane UI: http://localhost:5174
