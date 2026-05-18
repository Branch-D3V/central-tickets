# ==========================
# STAGE 1 - Build
# ==========================
FROM node:22-alpine AS builder

WORKDIR /app

# Args para variaveis NEXT_PUBLIC_* (inlinadas em build-time pelo Next)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_KEY=$NEXT_PUBLIC_KEY

# Copia dependencias e instala via lockfile
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o resto do projeto e builda
COPY . .
RUN npm run build

# ==========================
# STAGE 2 - Runtime
# ==========================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Usuario nao-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copia o standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
