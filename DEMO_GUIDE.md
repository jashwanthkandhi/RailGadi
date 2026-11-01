# 🎓 RailGadi — College Demonstration & Presentation Guide

Use this reference during your college presentation and viva.

---

## ⏱️ Quick Demonstration Workflow

| Step | Action / Command | What to Explain |
|---|---|---|
| **1. Structure** | `dir` | Highlight project files: `Dockerfile`, `docker-compose.yml`, `nginx.conf`. |
| **2. Architecture** | `Get-Content Dockerfile` | Explain multi-stage build: Stage 1 builds bundle, Stage 2 serves via Nginx (~21 MB). |
| **3. Launch** | `docker compose up --build -d` | Single-command deployment setting up network, port mapping (`3000:80`), and container. |
| **4. Verification** | `docker compose ps` | Show container status is `Up` and `(healthy)`. Show image via `docker images`. |
| **5. Browser Demo** | Open `http://localhost:3000` | Search train `12727` (Godavari Express) or `22436` (Vande Bharat). Show map, delay prediction, platform info, elevation chart. |
| **6. Teardown** | `docker compose down` | Cleanly stop and remove containers and network. |

---

## 🎙️ Speaking Script

### Step 1: Introduction
> *"Good morning respected faculty. Today I am demonstrating the containerized deployment of RailGadi, an Indian Railways real-time tracking and journey intelligence platform built with React, TypeScript, and Vite. We have containerized the entire application using a production-grade multi-stage Docker build and Docker Compose."*

### Step 2: Multi-Stage Build Explanation
> *"Instead of running a heavy Node.js runtime in production, we use a multi-stage Dockerfile. In Stage 1, Node.js compiles TypeScript into optimized static assets. In Stage 2, those assets are copied to an ultra-lightweight Nginx Alpine web server. This drops the production image size to only 21 MB and removes development dependencies."*

### Step 3: Deployment & Health Checks
> *"Running `docker compose up -d` starts the service on port 3000. Docker Compose runs an automated health check probing the `/health` endpoint every 15 seconds, ensuring zero downtime and reliable status reporting."*

### Step 4: Live Demonstration
> *"In the browser, the application connects through Nginx, which acts as a reverse proxy for `/api/v1` to fetch real-time railway telemetry without CORS issues. We can view live GPS tracking, route curves, predictive delay analytics, and track elevation profiles."*

### Step 5: Teardown
> *"With `docker compose down`, all resources and networks are gracefully removed."*

---

## ❓ Frequently Asked Viva Questions

**Q1: Why use multi-stage builds?**  
*A:* To keep the production image minimal and secure. The build tools (Node.js, npm, compilers) are only needed during compilation and are excluded from the final Nginx container.

**Q2: Why use Nginx instead of `vite preview` or `npm start`?**  
*A:* Nginx is a high-performance C-based web server engineered for static asset serving, reverse proxying, gzip compression, and high concurrency in production.

**Q3: How is internal vs external communication handled?**  
*A:* The browser connects to host port 3000, mapped to container port 80. Nginx handles reverse proxying to external APIs (`railradar.in`) directly, eliminating browser CORS restrictions.
