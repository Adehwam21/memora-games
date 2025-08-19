FROM node:18-bookworm-slim

# Install Python 3.11 and pip
RUN apt-get update && apt-get install -y \
    python3.11 python3-pip build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend and install Node deps
COPY memora-backend/package*.json ./memora-backend/
RUN npm ci --prefix memora-backend --omit=dev

COPY memora-backend ./memora-backend

# Copy AI server code and install Python deps
COPY memora-ai-server/requirements.txt ./memora-ai-server/
RUN pip install --upgrade pip && pip install -r memora-ai-server/requirements.txt

COPY memora-ai-server ./memora-ai-server

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

# Expose only Node backend port
EXPOSE 3000

CMD ["./start.sh"]
