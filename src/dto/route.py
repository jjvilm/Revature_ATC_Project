"""
Data Transfer Objects (DTOs) for Route entities.
"""

from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

class RouteID(BaseModel):
    """
    Data schema for identifying a route.
    """

    route_id: UUID = Field(
        ..., description = "UUID for a route"
    )

class RouteCreate(BaseModel):
    """
    Data schema for creating a new flight route.
    """

    origin_airport_code: str = Field(
        ..., description="IATA code for the starting airport"
    )
    destination_airport_code: str = Field(
        ..., description="IATA code for the target airport"
    )


class RouteRead(BaseModel):
    """
    Data schema for representing a route retrieved from the database.
    """

    route_id: UUID = Field(..., description="Unique database identifier for the route")
    origin_airport_code: str = Field(
        ..., description="IATA code for the starting airport"
    )
    destination_airport_code: str = Field(
        ..., description="IATA code for the target airport"
    )

    model_config = ConfigDict(from_attributes=True)
    
class RouteDelete(BaseModel):
    """
    Data schema for a user providing a route they wish to delete
    """

    route_id: UUID = Field(
        ..., description="The route that the user wishes to delete"
    )
    authorization_code: str = Field(
        ..., description="The authorization code that the user must provide for deletion."
    )
