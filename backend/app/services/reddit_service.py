import asyncio
import logging
from typing import List, Dict, Any, Optional
import praw
from datetime import datetime
from app.core.config import settings
from magentic import prompt, OpenaiChatModel
from pydantic import BaseModel

logger = logging.getLogger(__name__)
model = OpenaiChatModel("gpt-4o")

class Post(BaseModel):
    id: str
    title: str
    url: str
    score: int
    subreddit: str
    permalink: str
    created_utc: float
    author: str
    num_comments: int
    is_self: bool
    selftext: str

class RedditService:
    def __init__(self):
        self.reddit = None
        self._fetch_task = None
        self._stop_event = asyncio.Event()
        self._posts: List[Dict[str, Any]] = []
        self._last_fetch: Optional[datetime] = None
        
        # Initialize Reddit client
        self._init_reddit()
    
    def _init_reddit(self) -> None:
        """Initialize the Reddit client."""
        if not settings.REDDIT_CLIENT_ID or not settings.REDDIT_SECRET:
            logger.warning("Reddit API credentials not configured")
            return
            
        self.reddit = praw.Reddit(
            client_id=settings.REDDIT_CLIENT_ID,
            client_secret=settings.REDDIT_SECRET,
            user_agent=settings.REDDIT_USER_AGENT
        )
    
    async def fetch_new_posts(self, subreddit: str = "all", limit: int = None, company_description: str = "") -> List[Post]:
        """Fetch new posts from a subreddit and verify each post."""
        if not self.reddit:
            logger.warning("Reddit client not initialized")
            return []
        
        limit = limit or settings.POSTS_LIMIT
        posts = []
        
        try:
            # Use run_in_executor to avoid blocking the event loop with synchronous code
            loop = asyncio.get_event_loop()
            subreddit_obj = await loop.run_in_executor(
                None,
                lambda: self.reddit.subreddit(subreddit)
            )
            
            # Fetch new posts
            new_posts = await loop.run_in_executor(
                None,
                lambda: list(subreddit_obj.new(limit=limit))
            )
            
            # Process and verify posts
            for post in new_posts:
                post_data = {
                    'id': post.id,
                    'title': post.title,
                    'url': post.url,
                    'score': post.score,
                    'subreddit': subreddit_obj.display_name,
                    'permalink': f"https://reddit.com{post.permalink}",
                    'created_utc': post.created_utc,
                    'author': post.author.name if post.author else "[deleted]",
                    'num_comments': post.num_comments,
                    'is_self': post.is_self,
                    'selftext': post.selftext if hasattr(post, 'selftext') else ""
                }
                
                # Verify the post
                post_obj = Post(**post_data)
                is_verified = self.verify_post(
                    post=post_obj.selftext,
                    company_description=company_description
                )
                if is_verified:
                    print(post_data)
                
            #     # Only add verified posts
            #     if is_verified:
            #         posts.append(post_obj)
            #         print(post_obj)
            
            self._posts = posts
            self._last_fetch = datetime.now()
            logger.info(f"Fetched and verified {len(posts)}/{len(new_posts)} new posts from r/{subreddit}")
            
        except Exception as e:
            logger.error(f"Error fetching posts from r/{subreddit}: {e}")
            raise
        
        return posts
    
    def get_cached_posts(self) -> List[Post]:
        """Get the most recently fetched posts."""
        return self._posts
    
    def get_last_fetch_time(self) -> Optional[datetime]:
        """Get the timestamp of the last successful fetch."""
        return self._last_fetch

    @prompt("Verify that post has marketing potential for the company. \nPost: {post}\nCompany Description: {company_description}")
    def verify_post(post: str, company_description: str) -> bool: ...
    