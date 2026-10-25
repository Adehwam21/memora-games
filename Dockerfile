# ------------ Build React frontend ------------
FROM node:20-bookworm-slim AS web-builder
WORKDIR /web

COPY memora-web/package*.json ./
RUN npm ci
COPY memora-web ./

# Frontend and API share an origin, so the API base is a relative path
ENV VITE_SERVER_URL=/api/v1
RUN npm run build

# ------------ Build Node backend ------------
FROM node:20-bookworm-slim AS backend-builder
WORKDIR /backend

COPY memora-backend/package*.json ./
RUN npm ci
COPY memora-backend ./
RUN npm run build && npm prune --omit=dev

# ------------ Final runtime image ------------
FROM node:20-bookworm-slim

# Python 3.11 for the FastAPI model server
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.11 python3.11-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python dependencies first, so code changes don't reinstall them
RUN python3.11 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY memora-ai-server/requirements.txt ./memora-ai-server/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r memora-ai-server/requirements.txt

COPY memora-ai-server ./memora-ai-server
COPY --from=backend-builder /backend ./memora-backend
COPY --from=web-builder /web/dist ./memora-web/dist

COPY start.sh ./
RUN chmod +x start.sh

ENV NODE_ENV=production \
    WEB_DIST=/app/memora-web/dist \
    PROD_AI_SERVER_URL=http://127.0.0.1:8000/api/v1

# Render sets $PORT; only the Node server is exposed
EXPOSE 3000

CMD ["./start.sh"]
