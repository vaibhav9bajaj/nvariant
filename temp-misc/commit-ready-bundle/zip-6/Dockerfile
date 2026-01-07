# Minimal Node.js service Dockerfile (works for JS or TS projects)
# Assumptions:
# - package.json exists in this ZIP folder
# - Start command is either:
#     - npm run start
#     - or node <path> (override via START_CMD)
#
# If you use TypeScript:
# - Provide "build" script that outputs to dist/
# - Provide "start" script that runs dist entrypoint
#
# Environment:
# - PORT is set by docker-compose (defaults provided)

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# If you use pnpm or yarn, adjust accordingly.
RUN npm ci --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# If no build script exists, this will no-op gracefully if you keep it optional.
RUN npm run -s build || echo "No build step (ok)"

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy production node_modules
COPY --from=deps /app/node_modules ./node_modules
# Copy app source + built artifacts
COPY --from=build /app ./

# Optional: set default port
ENV PORT=7000
EXPOSE 7000

# Allow override without editing Dockerfile
ARG START_CMD="npm run start"
ENV START_CMD=$START_CMD

# Use sh -lc so START_CMD can be a string with args
CMD ["sh", "-lc", "$START_CMD"]
