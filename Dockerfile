# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \    
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    wget \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* ./
RUN npm ci --only=production

ENV PUPPETEER_HEADLESS=true
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
