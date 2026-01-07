# ZIP Dockerfile Notes

These ZIPs include a minimal Node.js Dockerfile intended to work with either JS or TS builds.

## Expected package.json scripts (recommended)
- "build": compile to dist/ (optional)
- "start": run the service (required)

Examples:
- JS:   "start": "node src/index.js"
- TS:   "build": "tsc -p tsconfig.json", "start": "node dist/index.js"

## Overriding the start command
docker-compose.yml supports build args via `START_CMD` if you add it under the service `build.args`.
By default the Dockerfile runs: `npm run start`.
