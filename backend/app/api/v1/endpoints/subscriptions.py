from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import BaseModel, constr
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.services.supabase_service import SupabaseService

router = APIRouter()

def get_supabase_service(request: Request) -> SupabaseService:
    """Dependency to get the Supabase service instance."""
    return request.app.state.supabase

class SubscriptionBase(BaseModel):
    subreddit: constr(strip_whitespace=True, to_lower=True, min_length=2, max_length=21)
    user_id: UUID
    last_fetched: Optional[datetime] = None

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionResponse(SubscriptionBase):
    id: UUID
    last_fetched: datetime

@router.post("/", response_model=SubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    subscription: SubscriptionCreate,
    supabase: SupabaseService = Depends(get_supabase_service)
):
    """
    Add a new subreddit subscription for a user.
    
    - **subreddit**: Name of the subreddit (without r/)
    - **user_id**: ID of the user
    """
    try:
        user_id_str = str(subscription.user_id)
        print(f"Creating/updating subscription for user {user_id_str}, subreddit {subscription.subreddit}")
        
        # This will handle both create and update cases
        data = supabase.add_subscription(
            user_id=user_id_str,
            subreddit=subscription.subreddit
        )
        
        if not data or len(data) == 0:
            print("No data returned from add_subscription")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No data returned from database"
            )
            
        return data[0]
            
    except HTTPException as he:
        print(f"HTTP Exception: {he.detail}")
        raise
    except Exception as e:
        error_msg = f"Unexpected error creating subscription: {str(e)}"
        print(error_msg)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@router.get("/{user_id}", response_model=List[SubscriptionResponse])
async def get_user_subscriptions(
    user_id: str,
    supabase: SupabaseService = Depends(get_supabase_service)
):
    """
    Get all subreddit subscriptions for a user.
    
    - **user_id**: ID of the user
    """
    try:
        subscriptions = supabase.list_subscriptions(user_id)
        return subscriptions or []
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error fetching subscriptions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.delete("/{subscription_id}/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(
    subscription_id: str,
    user_id: str,
    supabase: SupabaseService = Depends(get_supabase_service),
):
    """
    Delete a subreddit subscription.
    
    - **subscription_id**: UUID of the subscription to delete
    - **user_id**: ID of the user (for authorization)
    """
    # 1) Fetch the user’s subscriptions
    subs = supabase.list_subscriptions(user_id)
    
    # 2) Find the one with matching id (not subreddit name)
    subscription = next((s for s in subs if s["id"] == subscription_id), None)

    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found or access denied"
        )

    # 3) Delete it
    deleted_data = supabase.delete_subscription(user_id, subscription["subreddit"])

    # 4) FastAPI will automatically return a 204 No Content
    return deleted_data