from sqlalchemy.orm import Session
from . import models, schemas
from . import ai
from . import utils
# -- User Operations ---

# -- Find User by ID --
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# -- Check for Duplicates --
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# -- Create New User --
def create_user(db: Session, user: schemas.UserCreate):
    # Faking the password hash
    hashed_password = utils.hash_password(user.password)

    db_user = models.User(
        email=user.email,
        username=user.username,
        password_hash=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- Note Operations ---

def get_notes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Note).offset(skip).limit(limit).all()

def create_user_note(db: Session, note: schemas.NoteCreate, user_id: int):

    detected_mood = ai.analyze_mood(note.content)
    generated_tags = ai.generate_tags(note.content)

    db_note = models.Note(
        **note.dict(),
        user_id=user_id,
        mood=detected_mood,
        tags=generated_tags  
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note