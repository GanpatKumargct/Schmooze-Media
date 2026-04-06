from pydantic import BaseModel, ConfigDict
from typing import Optional, Any
from datetime import datetime

class IdeaCreate(BaseModel):
    title: str
    description: str

class IdeaResponse(BaseModel):
    id: str
    title: str
    description: str
    report: Optional[Any] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
