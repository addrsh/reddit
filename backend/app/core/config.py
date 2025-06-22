from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Reddit Fetcher"
    
    # Reddit API Configuration
    REDDIT_CLIENT_ID: str = os.getenv("REDDIT_CLIENT_ID", "")
    REDDIT_SECRET: str = os.getenv("REDDIT_SECRET", "")
    REDDIT_USER_AGENT: str = os.getenv("REDDIT_USER_AGENT", "RedditFetcher/0.1 by YourUsername")
    
    # Application Settings
    FETCH_INTERVAL_MINUTES: int = 60  # Fetch new posts every hour
    POSTS_LIMIT: int = 10  # Number of top posts to fetch
    
    class Config:
        case_sensitive = True

settings = Settings()
