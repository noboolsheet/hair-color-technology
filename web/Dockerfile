# ---- Stage 1: Build (Vite → dist/) ----
# SPA Vite + React. `npm run build` esegue prima il prebuild (optimize-images con
# sharp) e poi `tsc --noEmit && vite build` → dist/.
FROM node:22-alpine AS builder

WORKDIR /app

# sharp (usato dal prebuild optimize-images) richiede la compat libc su alpine.
RUN apk add --no-cache libc6-compat

# Layer cacheabile delle dipendenze (incluse devDeps: vite, sharp, tailwind…).
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---- Stage 2: Runtime (Node + Express) ----
# Il server Express (server/index.js) serve dist/ ed espone /api/send-contact e
# /api/send-application (invio via Gmail + allegato CV).
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Artefatti: build statico + server.
COPY --from=builder /app/dist ./dist
COPY server ./server

EXPOSE 3000
CMD ["node", "server/index.js"]
