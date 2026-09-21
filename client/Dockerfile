# Multi-stage Dockerfile for NurseCalc React Frontend
# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time environment arguments (optional overrides)
ARG VITE_API_URL=""
ARG VITE_SUPABASE_URL=""
ARG VITE_SUPABASE_ANON_KEY=""

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Copy package descriptors
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy client source code
COPY . .

# Build production bundle with Vite
RUN npm run build

# Stage 2: Serve with lightweight Nginx
FROM nginx:alpine AS runner

# Install curl for healthcheck
RUN apk add --no-cache curl

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA support & API reverse proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/healthz || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
