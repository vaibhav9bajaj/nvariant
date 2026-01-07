# Minimal Go runtime Dockerfile for nvariant ZIP services
# Assumptions:
# - Each ZIP is a Go module with go.mod in the ZIP root
# - Main package is in ./cmd/server (adjust if different)
# - Service listens on $PORT
#
# If your main is elsewhere, change the build command.
FROM golang:1.22-alpine AS build
WORKDIR /src
RUN apk add --no-cache git ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server ./cmd/server

FROM alpine:3.19
WORKDIR /app
RUN apk add --no-cache ca-certificates
ENV PORT=7000
COPY --from=build /out/server ./server
EXPOSE 7000
CMD ["./server"]
