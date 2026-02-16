"""
Database Engine and Session Configuration.

This module initializes the Database engine and SessionLocal which will generate sessions
for database communication. Config. data is pulled from local files.

Core Objects:
    engine: Facilitates a conncetion to a database, providing a source of database communication

    SessionLocal: A Session Maker which makes Sessions for database transactions.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.settings import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)
