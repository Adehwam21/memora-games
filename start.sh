#!/bin/bash
set -e

# Start FastAPI AI server in background
cd memora-ai-server
uvicorn main:app --host 0.0.0.0 --port 8000 &
cd ..

# Start Node.js backend (Render requires it on $PORT)
cd memora-backend
PORT=${PORT:-3000}
npm run start
