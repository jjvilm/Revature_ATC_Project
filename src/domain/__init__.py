"""
SQLAlchemy ORMs for Application

Defines the main tables for the application and associated information. These
objects will represent the state of the airline service.

"""

from .aircraft import Aircraft
from .airport import Airport
from .flight import Flight
from .flight_crew import FlightCrew
from .in_flight_employee import InFlightEmployee
from .route import Route

__all__ = [
    "Aircraft",
    "Airport",
    "FlightCrew",
    "Flight",
    "InFlightEmployee",
    "Route",
]
