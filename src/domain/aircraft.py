"""
SQLAlchemy ORM object for an Aircraft
"""

import uuid
from dataclasses import dataclass
from enum import Enum

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from src.base import Base


class AircraftStatus(Enum):
    """
    An Enum to track the status of an Aircraft

    Attributes:
        AVAILABLE (str): Aircraft is available for tasking
        DEPLOYED (str): Aircraft is currently deployed on a flight and
                        can not be redeployed until it is available
        MAINTENANCE (str): Aircraft is currently undergoing maintenance
                           and can not be deployed
    """

    AVAILABLE = "AVAILABLE"
    DEPLOYED = "DEPLOYED"
    AOG = "MAINTENANCE"


@dataclass
class Aircraft(Base):
    """
    The ORM model for an aircraft in the fleet.

    Attributes:
        aircraft_id (UUID): A unique UUID to track the aircraft as an individual unit
        manufacturer (str): The manufacturer of the aircraft (ex. Boeing, Airbus)
        aircraft_model (str): The type of the aircraft (ex. 757, A380)
        current_distance (Float): The current distance flown by the aircraft SINCE LAST MAINTENANCE
        aircraft_status (AircraftStatus): The current status of an aircraft
        aircraft_location (str): Location of aircraft at airport as represented by
                                    IATA code
            - This is a foreign key to `Airport` on ``airport_code``
    """

    __tablename__ = "aircraft"

    aircraft_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )

    manufacturer: Mapped[str] = mapped_column(String)
    aircraft_model: Mapped[str] = mapped_column(String)
    current_distance: Mapped[float] = mapped_column(Float)
    maintenance_interval: Mapped[float] = mapped_column(Float)
    aircraft_status: Mapped[AircraftStatus] = mapped_column(SQLEnum(AircraftStatus))

    aircraft_location: Mapped[str] = mapped_column(
        String, ForeignKey("airport.airport_code"), nullable=False
    )
