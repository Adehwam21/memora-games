# ------------ Build Node backend ------------
FROM node:18-bookworm-slim AS backend-builder
WORKDIR /backend

# Copy backend package files and install dependencies
COPY memora-backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY memora-backend ./

# ------------ Build Python AI server ------------
FROM python:3.11-slim AS ai-builder
WORKDIR /ai

# System deps (for numpy, pandas, scikit-learn, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY memora-ai-server/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy AI server source
COPY memora-ai-server ./

# ------------ Final runtime image ------------
FROM node:18-bookworm-slim

# Install Python runtime
RUN apt-get update && apt-get install -y \
    python3.11 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend (with node_modules)
COPY --from=backend-builder /backend ./memora-backend

# Copy AI server code and installed packages
COPY --from=ai-builder /ai ./memora-ai-server
COPY --from=ai-builder /usr/local/bin /usr/local/bin
COPY --from=ai-builder /usr/local/lib/python3.11 /usr/local/lib/python3.11

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

# Expose only Node backend port
EXPOSE 3000

# Start both services
CMD ["./start.sh"]
