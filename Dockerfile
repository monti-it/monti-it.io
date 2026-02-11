# Multi-stage Dockerfile for Vite + React
# Build args allow overriding Node version
ARG NODE_VERSION=20-alpine

############################
# Dev stage (optional)
############################
FROM node:${NODE_VERSION} AS dev
WORKDIR /app

# Install only dependency manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Expose Vite default dev port
EXPOSE 5173
# Run Vite dev server accessible from host (binds to 0.0.0.0)
CMD ["npm","run","dev","--","--host"]

############################
# Dependencies stage
############################
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

############################
# Build stage
############################
FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build production assets
RUN npm run build

############################
# Production image (Nginx for static serving)
############################
FROM nginx:1.27-alpine AS prod
# Set env variables if needed (example placeholder)
# ENV APP_ENV=production

# Remove default nginx static files and copy build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a minimal nginx config (optional). Using default if not provided.
# You can add a custom config by creating nginx.conf and uncommenting:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Final command (nginx default)
CMD ["nginx","-g","daemon off;"]

# Usage:
# Development: docker build -t try-react-dev --target dev . && docker run --rm -p 5173:5173 try-react-dev
# Production: docker build -t try-react . && docker run --rm -p 8080:80 try-react
