# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy lock + package
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for build)
RUN pnpm install

# Copy project including prisma schema
COPY . .

# Generate prisma client
RUN pnpm prisma generate

# Build nest app
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy only what's needed for production
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN pnpm install --prod

# Generate prisma client for production
RUN npx prisma generate

# Expose port (can be overridden by env)
EXPOSE 3001

# Run the app
CMD ["node", "dist/src/main.js"]