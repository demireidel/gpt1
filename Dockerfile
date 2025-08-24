# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY postcss.config.mjs .
COPY next.config.ts .
COPY tsconfig.json .
COPY app ./app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN pnpm install --frozen-lockfile=false
RUN pnpm build

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public 2>/dev/null || true
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
