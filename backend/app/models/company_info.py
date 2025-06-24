from pydantic import BaseModel
from datetime import datetime

class CompanyInfoBase(BaseModel):
    user_id: str
    company_url: str
    company_description: str

class CompanyInfoResponse(CompanyInfoBase):
    id: str
    created_at: datetime

class CompanyURLRequest(BaseModel):
    user_id: str
    company_url: str