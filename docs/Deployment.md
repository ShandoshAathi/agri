# AgriSense AI - Production Deployment Guide

## 1. Docker Compose Multi-Container Deployment

Use `docker-compose.yml` to orchestrate FastAPI backend, React static frontend, and PostgreSQL database containers:

```bash
docker-compose up -d --build
```

### Services Included
- `frontend`: NGINX web server serving production Vite React build output.
- `backend`: FastAPI Uvicorn ASGI server exposed on port 8000.
- `database`: PostgreSQL 15 database loaded with `database/schema.sql`.

---

## 2. Vercel Frontend Deployment
1. Connect repository to Vercel.
2. Set Framework Preset: **Vite**.
3. Environment Variable: `VITE_API_BASE_URL=https://api.agrisense.io/api/v1`.
4. Deploy.
