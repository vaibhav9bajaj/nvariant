Minimal Dockerfiles (Node + Go templates)

What you get:
- Dockerfile.node  -> works for ZIPs implemented as Node services (package.json, npm start)
- Dockerfile.go    -> works for ZIPs implemented as Go services (go.mod, ./cmd/server)

How to use:
1) Pick your stack per ZIP and rename into place:

   For Node ZIP:
     cp Dockerfile.node Dockerfile

   For Go ZIP:
     cp Dockerfile.go Dockerfile

2) Ensure your service listens on $PORT (compose sets PORT per ZIP).

Notes:
- Node template assumes build output at ./dist and start command `npm start`.
- Go template assumes main at ./cmd/server.
- Adjust paths/commands if your ZIP differs.
