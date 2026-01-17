from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from . import crud, models, schemas, utils
from .database import SessionLocal, engine
from jose import JWTError, jwt

# creating the tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# define the Lock
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Get the DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# get the current user for the security check

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        # decode the token using the secret key from utils
        payload = jwt.decode(token, utils.SECRET_KEY, algorithms=[utils.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # check if the user actually exists in DB
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# --- Login Endpoints ---

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)

    # check if the password is correct
    if not user or not utils.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # generate and return the token
    access_token = utils.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- User Endpoints ---

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# --- Note Endpoints ---

@app.post("/notes/", response_model=schemas.Note)
def create_note(
    note: schemas.NoteCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)):
    return crud.create_user_note(db=db, note=note, user_id=current_user.id)

@app.get("/notes/", response_model=List[schemas.Note])
def read_notes(skip: int = 0, 
               limit: int = 100, 
               db : Session = Depends(get_db),
               current_user: models.User = Depends(get_current_user)):
    notes = crud.get_notes(db, skip=skip, limit=limit)
    return notes