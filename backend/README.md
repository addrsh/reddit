# Reddit Fetcher API

A FastAPI-based service that fetches and serves top posts from Reddit.

## Features

- Fetches top posts from any subreddit
- Caches posts in memory
- Background task updates the cache periodically
- RESTful API endpoints to access the data

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AutoReddit/backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your Reddit API credentials

5. **Run the application**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/v1/posts?subreddit=all&limit=10` - Fetch top posts from a subreddit
- `GET /api/v1/cached-posts` - Get the most recently fetched posts from cache
- `GET /api/v1/status` - Get service status

## Getting Reddit API Credentials

1. Go to https://www.reddit.com/prefs/apps/
2. Click "Create App" or "Create Another App" at the bottom
3. Fill in the form:
   - Name: Your app name
   - App type: Choose "script"
   - Description: (optional)
   - About URL: (optional)
   - Redirect URI: http://localhost:8000 (or your app's URL)
4. Click "Create app"
5. Note the "client ID" (right under "web app") and "secret"

## Configuration

Update the following environment variables in your `.env` file:

- `REDDIT_CLIENT_ID`: Your Reddit app's client ID
- `REDDIT_SECRET`: Your Reddit app's secret
- `REDDIT_USER_AGENT`: A unique user agent for your app
- `FETCH_INTERVAL_MINUTES`: How often to fetch new posts (default: 60)
- `POSTS_LIMIT`: Number of top posts to fetch (default: 10)

## Development

- Format code with Black:
  ```bash
  black .
  ```

- Run tests:
  ```bash
  pytest
  ```

## License

MIT
