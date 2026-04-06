from sqlalchemy import Column, String, Text, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from database.database import Base

class Idea(Base):
    __tablename__ = "ideas"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    description = Column(Text)
    report = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
