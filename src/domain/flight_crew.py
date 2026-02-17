"""
Defines the SQLAlchemy ORM  for the FlightCrew table
"""

import uuid
from dataclasses import dataclass

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.base import Base


@dataclass
class FlightCrew(Base):
    """
    The FlightCrew ORM object for the FlightCrew table.
    FlightCrew is actually a junction table.

    Attributes:
        flight_id (UUID): The UUID which marks an individual flight event
        employee_id (UUID): The UUID which marks an employee
    """

    __tablename__ = "flight_crew"

    flight_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("flight.flight_id", ondelete="CASCADE"), # DB Level Cascade
        primary_key=True
    )
    employee_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("in_flight_employee.employee_id"),
        primary_key=True
    )

    flight = relationship("Flight", back_populates="crew_members")
