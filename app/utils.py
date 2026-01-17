from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
import os
from dotenv import load_dotenv

# load the secret key from .env
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# setup the password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    """
    Takes a plain password and returns a hash
    """
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    """
    Checks if a password matches the hash.
    It re-hashes the plain password and compares the result.
    """
    return pwd_context.verify(plain_password, hashed_password)

# setup token generation
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

