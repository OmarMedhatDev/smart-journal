from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    mood: Optional[str] = None
    tags: Optional[str] = None

    class Config:
        orm_mode = True

# --- User Schemas ---

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool = True
    notes: List[Note] = []

    class Config:
        orm_mode = True