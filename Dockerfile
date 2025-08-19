# ------------ Build Node backend ------------
FROM node:18-slim AS backend-builder
WORKDIR /backend

COPY memora-backend/package*.json ./
RUN npm ci --omit=dev

COPY memora-backend ./


# ------------ Build Python AI server ------------
FROM python:3.11-slim AS ai-builder
WORKDIR /ai

RUN apt-get update && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY memora-ai-server/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY memora-ai-server ./


# ------------ Final runtime image ------------
FROM node:18-slim
WORKDIR /app

# Install system deps for Python libs to run
RUN apt-get update && apt-get install -y python3.11 python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy backend (with node_modules from builder)
COPY --from=backend-builder /backend ./memora-backend

# Copy Python site-packages + scripts (includes uvicorn) directly
COPY --from=ai-builder /usr/local /usr/local
COPY --from=ai-builder /ai ./memora-ai-server

# Copy start script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["./start.sh"]
