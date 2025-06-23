from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.services.supabase_service import SupabaseService
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.models.company_info import CompanyInfoBase, CompanyInfoResponse, CompanyURLRequest
from typing import List

router = APIRouter()

def get_supabase_service(request: Request) -> SupabaseService:
    """Dependency to get the Supabase service instance."""
    return request.app.state.supabase

@router.post("/{user_id}", status_code=status.HTTP_200_OK)
async def upload_company_link(
    user_id: str,
    company_url_request: CompanyURLRequest,
    supabase: SupabaseService = Depends(get_supabase_service),
):
    try:
        description = supabase.suggest_company_description(company_url_request.company_url)
        res =  supabase.upsert_company_info(CompanyInfoBase(user_id=UUID(user_id), company_url=company_url_request.company_url, company_description=description))
        if not res:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to upsert company info")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return CompanyInfoResponse(
        id=res.id,
        user_id=res.user_id,
        company_url=res.company_url,
        company_description=res.company_description,
        created_at=res.created_at
    )

@router.get("/{user_id}", response_model=List[CompanyInfoResponse])
async def get_company_info(
    user_id: str,
    supabase: SupabaseService = Depends(get_supabase_service),
):
    try:
        company_info = supabase.get_company_info(user_id)
        if not company_info:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company info not found")
        return [CompanyInfoResponse(
            id=info.id,
            user_id=info.user_id,
            company_url=info.company_url,
            company_description=info.company_description,
            created_at=info.created_at
        ) for info in company_info]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/{user_id}", status_code=status.HTTP_200_OK)
async def update_company_info(
    user_id: str,
    company_info: CompanyInfoBase,
    supabase: SupabaseService = Depends(get_supabase_service),
):
    try:
        new_info = CompanyInfoBase(user_id=UUID(user_id), company_url=company_info.company_url, company_description=company_info.company_description)

        returned_info = supabase.upsert_company_info(new_info)
        if not returned_info:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company info not found")
        return CompanyInfoResponse(
            id=returned_info.id,
            user_id=returned_info.user_id,
            company_url=returned_info.company_url,
            company_description=returned_info.company_description,
            created_at=returned_info.created_at
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
