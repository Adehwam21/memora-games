# ------------ Build Node backend ------------
FROM node:18-bookworm-slim AS backend-builder
WORKDIR /backend

COPY memora-backend/package*.json ./
RUN npm ci --omit=dev
COPY memora-backend ./

# ------------ Final runtime image ------------
FROM node:18-bookworm-slim

# Install Python 3.11 and build tools
RUN apt-get update && apt-get install -y \
    python3.11 python3-pip build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend (with node_modules)
COPY --from=backend-builder /backend ./memora-backend

# Copy AI server code
COPY memora-ai-server ./memora-ai-server

# Install Python dependencies in final image
RUN pip install --upgrade pip && \
    pip install -r memora-ai-server/requirements.txt

# Copy start script
COPY start.sh ./ 
RUN chmod +x start.sh

# Expose only backend port for Render
EXPOSE 3000

CMD ["./start.sh"]
