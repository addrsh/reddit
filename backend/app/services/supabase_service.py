import os
from supabase import create_client, Client
from datetime import datetime

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # or anon key if using anon routes

class SupabaseService:
    def __init__(self):
        self.supabase: Client = create_client(URL, KEY)

    def add_subscription(self, user_id: str, subreddit: str):
        try:
            # Insert the subscription (Supabase will handle the duplicate check with unique constraint)
            res = self.supabase.table("user_subscriptions") \
                .upsert({
                    "user_id": user_id,
                    "subreddit": subreddit,
                    # last_fetched will default to NOW()
                }, on_conflict='user_id,subreddit').execute()
            
            # Return the data and None for error if successful
            return res.data
            
        except Exception as e:
            print(f"Error in add_subscription: {str(e)}")
            return str(e)

    def delete_subscription(self, user_id: str, subreddit: str):
        res = self.supabase.table("user_subscriptions") \
            .delete() \
            .eq("user_id", user_id) \
            .eq("subreddit", subreddit) \
            .execute()
        return res.data

    def list_subscriptions(self, user_id: str):
        res = self.supabase.table("user_subscriptions") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("subreddit") \
            .execute()

        return res.data

    def update_last_fetched(self, user_id: str, subreddit: str):
        res = self.supabase.table("user_subscriptions") \
            .update({"last_fetched": datetime.utcnow().isoformat()}) \
            .eq("user_id", user_id) \
            .eq("subreddit", subreddit) \
            .execute()
        return res.data