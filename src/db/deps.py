"""
Provides a function to get Session instances.

Yields:
    Session: A Session object, which is a connection to a Database (in our case, Postgres)
"""

from typing import Generator

from sqlalchemy.orm import Session

from src.db.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Creates a returns a Session object which contains a connection to the DB.

    Yields:
        Session: A Session Object

    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
