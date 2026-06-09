# ── Stage 1: Build React frontend ──────────────────────────────────────────
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


# ── Stage 2: Run Express + MongoDB backend ─────────────────────────────────
FROM node:18-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY backend/ ./

# Copy built React app from Stage 1
COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 5000

CMD ["node", "server.js"]

//docker compose up
//docker compose down to stop the containers 