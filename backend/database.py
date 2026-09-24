import os
from typing import Optional
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables from .env
load_dotenv()

# ----------------------------------------------------
# 1. Supabase Client Setup using supabase-py
# ----------------------------------------------------
try:
    from supabase import create_client, Client
except ImportError:
    create_client = None
    Client = None

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", os.getenv("SUPABASE_ANON_KEY", ""))

supabase: Optional[Client] = None

if create_client and SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase client successfully.")
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase client: {e}")
        supabase = None


def get_supabase() -> Optional[Client]:
    """Helper to retrieve or initialize the singleton Supabase client."""
    global supabase
    if supabase is not None:
        return supabase
    if create_client and SUPABASE_URL and SUPABASE_KEY:
        try:
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        except Exception as e:
            print(f"Supabase init error: {e}")
    return supabase


# ----------------------------------------------------
# 2. SQLAlchemy Database Setup (PostgreSQL / SQLite)
# ----------------------------------------------------
# Fetch database URL from environment variable (Supabase/Render) or fall back to local SQLite
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", "sqlite:///./kisaan_setu.db"
)

# Render/Supabase use postgres://, SQLAlchemy requires postgresql://
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
  SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
      "postgres://", "postgresql://", 1
  )

connect_args = (
    {"check_same_thread": False}
    if "sqlite" in SQLALCHEMY_DATABASE_URL
    else {}
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()