from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime

from app.services.reddit_service import RedditService
from fastapi import Request

api_router = APIRouter()

def get_reddit_service(request: Request) -> RedditService:
    """Dependency to get the Reddit service instance."""
    return request.app.state.reddit_service

@api_router.get("/posts")
async def get_posts(
    subreddit: str = "all",
    limit: int = 10,
    company_description: str = "",
    reddit_service: RedditService = Depends(get_reddit_service),
) -> List[Dict[str, Any]]:
    """
    Get new posts from a subreddit, verified for relevance.
    
    Args:
        subreddit: The subreddit to fetch posts from (default: "all")
        limit: Maximum number of posts to return (default: 10)
        company_description: Description of the company for post verification
        
    Returns:
        List of verified post objects
    """
    try:
        posts = await reddit_service.fetch_new_posts(
            subreddit=subreddit, 
            limit=limit,
            company_description=company_description
        )
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/status")
async def get_status(
    reddit_service: RedditService = Depends(get_reddit_service),
) -> Dict[str, Any]:
    """
    Get the status of the Reddit fetcher service.
    
    Returns:
        Status information including last fetch time and number of cached posts
    """
    return {
        "status": "running",
        "last_fetch": reddit_service.get_last_fetch_time(),
        "cached_posts_count": len(reddit_service.get_cached_posts())
    }
