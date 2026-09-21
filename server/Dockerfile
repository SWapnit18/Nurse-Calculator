# Production Dockerfile for NurseCalc Express Backend
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install curl for container healthcheck
RUN apk add --no-cache curl

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy package descriptors first to maximize layer cache
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Use non-root node user for container security
USER node

# Expose API port
EXPOSE 5000

# Docker healthcheck pinging express health endpoint
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the production Node server
CMD ["node", "server.js"]
