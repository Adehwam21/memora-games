# ------------ Build Node backend ------------
FROM node:18-slim AS backend-builder
WORKDIR /backend

# Copy backend package files and install dependencies
COPY memora-backend/package*.json ./ 
RUN npm install --production

# Copy backend source
COPY memora-backend ./


# ------------ Install Python AI server ------------
FROM python:3.11-slim AS ai-builder
WORKDIR /ai

# System deps (if needed for numpy, pandas, scikit-learn, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY memora-ai-server/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy AI server source
COPY memora-ai-server ./


# ------------ Final runtime image ------------
FROM debian:bullseye-slim

# Install Node + Python runtime
RUN apt-get update && apt-get install -y \
    nodejs npm python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend
COPY --from=backend-builder /backend ./memora-backend

# Copy AI server
COPY --from=ai-builder /ai ./memora-ai-server

# Install Node deps (already in node_modules, but ensure they're available)
WORKDIR /app/memora-backend
RUN npm rebuild --production

# Copy start script
WORKDIR /app
COPY start.sh .
RUN chmod +x start.sh

# Expose only Node backend ($PORT for Render)
EXPOSE 3000

# Start both services
CMD ["./start.sh"]
