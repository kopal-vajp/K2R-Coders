"""
FastAPI Backend Intelligence Core

Startup Instruction:
uvicorn main:app --reload --port 8000
"""

import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import predict, fatigue, segment, decision, message
from backend.schemas.response import StandardResponse

# Configure structured standard output logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | [%(name)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("backend.main")

app = FastAPI(
    title="MessageMind AI Intelligence Core",
    description="Backend deterministic mock inference engine for MessageMind AI.",
    version="1.1.0"
)

# CORS middleware for Next.js frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Latency tracking middleware
@app.middleware("http")
async def process_time_and_log(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time_ms = round((time.time() - start_time) * 1000, 2)
        response.headers["X-Process-Time-Ms"] = str(process_time_ms)
        
        # Log endpoint hits
        logger.info(f"{request.method} {request.url.path} | Status: {response.status_code} | Latency: {process_time_ms}ms")
        return response
    except Exception as e:
        process_time_ms = round((time.time() - start_time) * 1000, 2)
        logger.error(f"Route Failure: {request.method} {request.url.path} | Latency: {process_time_ms}ms | Error: {str(e)}")
        raise e

# Mount specific logic routers
app.include_router(predict.router)
app.include_router(fatigue.router)
app.include_router(segment.router)
app.include_router(decision.router)
app.include_router(message.router)

@app.get("/health", tags=["System"], response_model=StandardResponse[dict])
async def root():
    start = time.time()
    data = {
        "status": "online", 
        "engine": "MessageMind AI Refactored Core",
        "version": "1.1.0"
    }
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=data, latency_ms=latency)
