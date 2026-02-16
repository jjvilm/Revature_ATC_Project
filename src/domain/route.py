import uuid
from math import asin, cos, radians, sin, sqrt

from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.hybrid import hybrid_property

from src.base import Base


class Route(Base):
    __tablename__ = "route"

    route_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    destination_airport_code = Column(
        String, ForeignKey("airport.airport_code"), nullable=False
    )
    origin_airport_code = Column(
        String, ForeignKey("airport.airport_code"), nullable=False
    )
