import os
from supabase import create_client, Client
from datetime import datetime

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # or anon key if using anon routes

class SupabaseService:
    def __init__(self):
        self.supabase: Client = create_client(URL, KEY)

    def add_subscription(self, user_id: str, subreddit: str):
        res = self.supabase.table("user_subscriptions") \
            .insert({
                "user_id": user_id,
                "subreddit": subreddit,
                # last_fetched will default to NOW()
            }).execute()
        return res.data, res.error

    def delete_subscription(self, user_id: str, subreddit: str):
        res = self.supabase.table("user_subscriptions") \
            .delete() \
            .eq("user_id", user_id) \
            .eq("subreddit", subreddit) \
            .execute()
        return res.data, res.error

    def list_subscriptions(self, user_id: str):
        res = self.supabase.table("user_subscriptions") \
            .select("subreddit, last_fetched") \
            .eq("user_id", user_id) \
            .order("subreddit") \
            .execute()
        return res.data, res.error

    def update_last_fetched(self, user_id: str, subreddit: str):
        res = self.supabase.table("user_subscriptions") \
            .update({"last_fetched": datetime.utcnow().isoformat()}) \
            .eq("user_id", user_id) \
            .eq("subreddit", subreddit) \
            .execute()
        return res.data, res.error