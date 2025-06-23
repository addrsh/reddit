from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class CompanyInfoBase(BaseModel):
    user_id: UUID
    company_url: str
    company_description: str

class CompanyInfoResponse(CompanyInfoBase):
    id: UUID
    created_at: datetime

class CompanyURLRequest(BaseModel):
    user_id: UUID
    company_url: str