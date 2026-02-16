from src.domain.aircraft import Aircraft
from src.domain.airport import Airport
from src.repositories.aircraft_repository_protocol import \
    AircraftRepositoryProtocol
from src.repositories.airport_repository_protocol import \
    AirportRepositoryProtocol


class AircraftService:
    def __init__(
        self,
        aircraft_repo: AircraftRepositoryProtocol,
        airport_repo: AirportRepositoryProtocol,
    ):
        self.aircraft_repo = aircraft_repo
        self.airport_repo = airport_repo

    def get_aircraft_at_airport(self, airport: Airport) -> list[Aircraft]:
        return self.aircraft_repo.find_by_airport(airport.airport_code)

    def available_aircraft_at_airport(self, airport: Airport) -> list[Aircraft]:
        return self.aircraft_repo.availabe_aircraft_by_airport(airport)
