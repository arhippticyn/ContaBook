from fastapi import FastAPI, Depends, status, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db import User, Contact, get_db
from jwt.exceptions import InvalidTokenError
from models import RegisterUser, UserResponse
import jwt
from passlib.context import CryptContext
from datetime import datetime, timezone, timedelta
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
import os

load_dotenv()

ALGORITM = 'HS256'
SECRET_KEY = '09d25e094faa6ca2556c818166b7a9563b93f7099f6f8f4caa6cf63b88e8d3e7'
EXPIRES = 15
GITHUB_GLIENT_ID = os.getenv('GITHUB_GLIENT_ID')
GITHUB_GLIENT_SECRET = os.getenv('GITHUB_GLIENT_SECRET')
GOOGLE_GLIENT_ID = os.getenv('GOOGLE_GLIENT_ID')
GOOGLE_GLIENT_SECRET = os.getenv('GOOGLE_GLIENT_SECRET')

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)

oauth = OAuth()

oauth.register(
    name="google",
    client_id=GOOGLE_GLIENT_ID,
    client_secret=GOOGLE_GLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile"
    },
)



oauth.register(
    name='github',
    client_id=GITHUB_GLIENT_ID,
    client_secret=GITHUB_GLIENT_SECRET,
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'}
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

pwd_context = CryptContext(schemes=['argon2'], deprecated='auto')

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password:str, hash_password: str):
    return pwd_context.verify(plain_password, hash_password)

@app.post('/auth/register', response_model=UserResponse)
def register(user: RegisterUser, db: Session = Depends(get_db)):
    user_db = db.query(User).filter(User.username == user.username).first()


    if user_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User is alredy register')
    
    if not user_db:
        user_db = User(username=user.username, email=user.email, password=hash_password(user.password), provider='local', provider_id='local')
        db.add(user_db)
        db.commit()
        db.refresh(user_db)

    return user_db


@app.post('/auth/login')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or user is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User is not register')
    
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='username or password is not correct')
    
    payload = {
        'sub': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    creditials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITM])
        username = payload.get('sub')

        if username is None:
            raise creditials_exception
        
    except InvalidTokenError:
        raise creditials_exception
    
    user = db.query(User).filter(User.username == username).first()

    if user is None:
        raise creditials_exception
    
    return user

@app.get('/users/me', response_model=UserResponse)
def read_user(user: User = Depends(get_current_user)):
    return user


@app.get('/auth/google')
async def google_login(request: Request):
    redirect_uri = 'http://127.0.0.1:8000/auth/google/callback'
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/github')
async def github_login(request: Request):
    redirect_uri = 'http://127.0.0.1:8000/auth/github/callback'
    return await oauth.github.authorize_redirect(request, redirect_uri)

@app.get('/auth/google/callback')
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token['userinfo']

    email = user_info['email']
    username = user_info['email'].split('@')[0]

    provider = 'google'
    provider_id = user_info['sub']

    user = db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()

    if not user:
        user = User(username=username, email=email, password=None, provider=provider, provider_id=provider_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    payload = {
        'sub': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}

@app.get('/auth/github/callback')
async def github_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.github.authorize_access_token(request)
    resp = await oauth.github.get('user', token=token)
    profile = resp.json()

    email_resp = await oauth.github.get('user/emails', token=token)
    emails = email_resp.json()
    email = next((e['email'] for e in emails if e['primary'] and e.get('verified', True)), None)

    username = profile['login']

    provider = 'github'
    provider_id = str(profile['id'])

    user = db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()

    if not user:
        user = User(username=username, email=email, password=None, provider=provider, provider_id=provider_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    payload = {
        'sub': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}