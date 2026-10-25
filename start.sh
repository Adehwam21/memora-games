#!/bin/bash
set -e

# Start FastAPI AI server in background (internal only)
cd memora-ai-server
uvicorn main:app --host 127.0.0.1 --port 8000 &
cd ..

# Start Node.js backend, which also serves the React build (Render requires it on $PORT)
cd memora-backend
PORT=${PORT:-3000} node dist/index.js &
cd ..

# If either process dies, exit so Render restarts the whole container
set +e
wait -n
status=$?
echo "A server process exited with status $status; shutting down the container"
exit 1
