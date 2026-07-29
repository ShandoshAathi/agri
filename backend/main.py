from fastapi import FastAPI
from middleware.cors_middleware import setup_cors
from api.v1_router import api_v1_router
from config.settings import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Modular FastAPI REST & WebSocket server for AgriSense AI Precision Agriculture.",
    version=settings.VERSION
)

# Configure CORS Middleware
setup_cors(app)

# Include API v1 Router Aggregator
app.include_router(api_v1_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {
        "status": "Online",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
