from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from typing import List, Optional
import os
from dotenv import load_dotenv

from app.api.v1.api import api_router
from app.core.config import settings
from app.services.reddit_service import RedditService

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Startup: Initialize services
    app.state.reddit_service = RedditService()
    
    # Start the background task to fetch posts
    # await app.state.reddit_service.start_fetching()
    
    yield
    
    # Shutdown: Clean up resources
    # await app.state.reddit_service.stop_fetching()

app = FastAPI(
    title="Reddit Fetcher API",
    description="API for fetching and serving top Reddit posts",
    version="0.1.0",
    lifespan=lifespan
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    """Root endpoint that returns a welcome message."""
    return {"message": "Welcome to the Reddit Fetcher API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
