import os
from supabase import create_client, Client
from datetime import datetime
from magentic import prompt
from bs4 import BeautifulSoup
import requests

from app.models.company_info import CompanyInfoBase

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # or anon key if using anon routes

def _scrape_company_info_from_url(company_url: str) -> str:
        """
        Scrape company information from a given URL.
        
        Args:
            company_url: The URL of the company website
        
        Returns:
            The scraped text information about the company
        """
        try:            
            response = requests.get(company_url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find the company information on the page
            # This is a very basic scraper and may not work for all websites
            company_info_p = soup.find('p', {'class': 'company-info'})
            if not company_info_p:
                return ""
            
            return company_info_p.text.strip()
        
        except Exception as e:
            print(f"Error in scrape_company_info_from_url: {str(e)}")
            return ""

@prompt_chain(
    "Describe in as much detail as you can about the company with the given URL: {company_url}",
    functions=[_scrape_company_info_from_url]
)
def suggest_company_description(company_url: str) -> str: ...

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
        
    def update_company_description(self, user_id: str, company_id: str, company_description: str):
        """
        Update a user's company description.
        
        Args:
            user_id: The ID of the user
            company_id: The company ID to identify the record
            company_description: The new company description
            
        Returns:
            The updated company info record
        """
        try:
            res = self.supabase.table("company_info") \
                .update({
                    "company_description": company_description,
                    "updated_at": datetime.utcnow().isoformat()
                }) \
                .eq("user_id", user_id) \
                .eq("company_id", company_id) \
                .execute()
                
            if not res.data:
                return None
                
            return res.data[0]
            
        except Exception as e:
            print(f"Error in update_company_description: {str(e)}")
            raise e

    def upsert_company_info(self, company_info: CompanyInfoBase):
        try:
            res = self.supabase.table("company_informations") \
                .upsert({
                    "user_id": company_info.user_id,
                    "company_url": company_info.company_url,
                    "company_description": company_info.company_description,
                }, on_conflict='user_id').execute()
                
            if not res.data or len(res.data) == 0:
                return None
                
            return res.data[0]
            
        except Exception as e:
            print(f"Error in update_company_info: {str(e)}")
            raise e

    def get_company_info(self, user_id: str):
        try:
            res = self.supabase.table("company_informations") \
                .select("*") \
                .eq("user_id", user_id) \
                .execute()
                
            if not res.data:
                return None
                
            return res.data
            
        except Exception as e:
            print(f"Error in get_company_info: {str(e)}")
            raise e
        