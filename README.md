# 🚆 RailGadi

> Real-Time Indian Railways Journey Intelligence & Live Tracking Platform

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#-docker-deployment)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Nginx](https://img.shields.io/badge/Nginx-1.27-009639?logo=nginx&logoColor=white)](https://nginx.org/)

**RailGadi** is an intelligent Indian Railways live tracking platform that combines real-time telemetry, predictive delay analytics, track elevation profiling, and interactive GIS mapping to provide seamless journey intelligence.

---

## ✨ Key Features

- **Live GPS Tracking & Route Alignment:** Polyline track snapping using Turf.js and MapLibre GL for accurate train positions.
- **Predictive Delay Intelligence:** Dynamic algorithm estimating delay propagation and recovery times for upcoming halts.
- **Station Timetable & Platform Allocations:** Live arrival/departure schedules, halt durations, and platform updates.
- **Route Elevation Profiling:** Dynamic track elevation gradient charts across railway corridors.
- **Coach & Speed Analytics:** Real-time speed telemetry and coach position indicator.
- **Resilient Fallback Mode:** Built-in offline and fallback simulation for major express corridors.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Zustand, TanStack React Query v5
- **GIS & Mapping:** MapLibre GL, MapTiler SDK, Turf.js
- **Containerization:** Docker Engine 29+, Docker Compose v5+, Nginx 1.27 Alpine

---

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jashwanthkandhi/RailGadi.git
   cd RailGadi
   ```

2. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   ```

3. **Build and start the application:**
   ```bash
   docker compose up --build -d
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Stop the container:**
   ```bash
   docker compose down
   ```

---

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at `http://localhost:5173`.

---

## 🏗️ Architecture

```
Client (Browser) ──> [Port 3000] ──> Nginx (Docker Container)
                                       ├── Static SPA Files (React / Vite)
                                       ├── Health Endpoint (/health)
                                       └── Reverse Proxy (/api/v1/) ──> RailRadar API
```

- **Multi-Stage Build:** `node:22-alpine` compiles the application into static assets; an ultra-lightweight `nginx:1.27-alpine` image serves the production bundle (~21 MB total image size).
- **Reverse Proxy:** Nginx routes `/api/v1/` to the RailRadar backend, eliminating browser CORS limitations.
- **Dual-Stack & Health Monitoring:** Configured for IPv4/IPv6 with automated container health probes at `/health`.

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_MAPTILER_API_KEY` | MapTiler API key for vector map tiles | Pre-configured |
| `VITE_RAILRADAR_API_KEY` | RailRadar API key for live train data | Pre-configured |
| `VITE_RAILRADAR_BASE_URL` | Base endpoint for RailRadar reverse proxy | `/api/v1` |
| `VITE_OPENWEATHER_API_KEY`| OpenWeatherMap API key | Optional |
| `VITE_OPENELEVATION_BASE_URL` | Elevation lookup endpoint | Open-Elevation |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Vite development server with HMR |
| `npm run build` | Compiles TypeScript and creates optimized production build |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs fast linter checks via Oxlint |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
