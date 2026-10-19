import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

Database_URL=os.getenv("Database_URL")
if not Database_URL:
    raise RuntimeError("Database_URL is missing  from backend/.env")

engine=create_engine(
    Database_URL,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)