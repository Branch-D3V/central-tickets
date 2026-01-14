# ==========================
# STAGE 1 - Build
# ==========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências
COPY package.json package-lock.json* ./

RUN npm install

# Copia o resto do projeto
COPY . .

# Build do Next
RUN npm run build

# ==========================
# STAGE 2 - Runtime
# ==========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia apenas o standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
