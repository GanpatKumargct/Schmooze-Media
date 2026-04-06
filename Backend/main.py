from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from models import models
from schemas import schemas
from database import database
from database.database import engine, get_db
from services.ai_service import generate_idea_report

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Startup Idea Validator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For MVP, allow all. Make sure to lock down in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ideas", response_model=schemas.IdeaResponse)
def create_idea(idea: schemas.IdeaCreate, db: Session = Depends(get_db)):
    # 1. Generate AI report
    report = generate_idea_report(idea.title, idea.description)
    
    # 2. Save to database
    db_idea = models.Idea(
        title=idea.title,
        description=idea.description,
        report=report
    )
    db.add(db_idea)
    db.commit()
    db.refresh(db_idea)
    
    return db_idea

@app.get("/ideas", response_model=List[schemas.IdeaResponse])
def get_ideas(db: Session = Depends(get_db)):
    return db.query(models.Idea).order_by(models.Idea.created_at.desc()).all()

@app.get("/ideas/{idea_id}", response_model=schemas.IdeaResponse)
def get_idea(idea_id: str, db: Session = Depends(get_db)):
    idea = db.query(models.Idea).filter(models.Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    return idea

@app.delete("/ideas/{idea_id}")
def delete_idea(idea_id: str, db: Session = Depends(get_db)):
    idea = db.query(models.Idea).filter(models.Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    
    db.delete(idea)
    db.commit()
    return {"message": "Idea deleted successfully"}
