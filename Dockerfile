# ==============================================================================
# RailGadi - Multi-Stage Production Dockerfile
# Optimized for College Demonstration & Production Deployment
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Stage (Node.js Alpine)
# Compiles TypeScript and creates optimized Vite production bundle
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies cleanly and deterministically
RUN npm ci

# Build-time environment variable arguments for Vite
ARG VITE_APP_NAME="RailGaadi"
ARG VITE_APP_VERSION="2.0.0"
ARG VITE_MAPTILER_API_KEY=""
ARG VITE_RAILRADAR_API_KEY=""
ARG VITE_RAILRADAR_BASE_URL="/api/v1"
ARG VITE_OPENWEATHER_API_KEY=""
ARG VITE_OPENWEATHER_BASE_URL="https://api.openweathermap.org/data/2.5"
ARG VITE_OPENELEVATION_BASE_URL="https://api.open-elevation.com/api/v1/lookup"
ARG VITE_OPENTOPO_API_KEY=""
ARG VITE_API_BASE_URL="/api"
ARG VITE_JOURNEY_REFRESH_INTERVAL_MS="60000"
ARG VITE_SEARCH_DEBOUNCE_MS="350"

# Expose build args as environment variables for the build process
ENV VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_VERSION=$VITE_APP_VERSION \
    VITE_MAPTILER_API_KEY=$VITE_MAPTILER_API_KEY \
    VITE_RAILRADAR_API_KEY=$VITE_RAILRADAR_API_KEY \
    VITE_RAILRADAR_BASE_URL=$VITE_RAILRADAR_BASE_URL \
    VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY \
    VITE_OPENWEATHER_BASE_URL=$VITE_OPENWEATHER_BASE_URL \
    VITE_OPENELEVATION_BASE_URL=$VITE_OPENELEVATION_BASE_URL \
    VITE_OPENTOPO_API_KEY=$VITE_OPENTOPO_API_KEY \
    VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_JOURNEY_REFRESH_INTERVAL_MS=$VITE_JOURNEY_REFRESH_INTERVAL_MS \
    VITE_SEARCH_DEBOUNCE_MS=$VITE_SEARCH_DEBOUNCE_MS

# Copy source code into container
COPY . .

# Compile TypeScript and build static web distribution
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Stage (Nginx Alpine)
# Serves static assets with reverse proxy and SPA routing
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS production

WORKDIR /usr/share/nginx/html

# Clean default Nginx placeholder files
RUN rm -rf ./*

# Copy compiled assets from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose container HTTP port
EXPOSE 80

# Health check to ensure the web server is responsive
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/health || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
