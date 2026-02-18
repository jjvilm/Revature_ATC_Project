from __future__ import annotations

from io import BytesIO

import matplotlib
import pandas as pd
from matplotlib.figure import Figure
from sqlalchemy import text

from src.db.database import engine

matplotlib.use("Agg")


# return bytes for images in python
def _fig_to_png_bytes(fig: Figure) -> bytes:
    buffer = BytesIO()
    fig.tight_layout()
    fig.savefig(buffer, format="png", dpi=150)
    buffer.seek(0)
    return buffer.getvalue()


def top_10_busiest_routes() -> bytes:
    query = text(
        """
        SELECT
            r.origin_airport_code,
            r.destination_airport_code,
            COUNT(*) AS flight_count
        FROM flight f
        JOIN route r ON f.route_id = r.route_id
        GROUP BY r.origin_airport_code, r.destination_airport_code
        ORDER BY flight_count DESC
        LIMIT 10
        """
    )

    df = pd.read_sql_query(query, engine)
    if df.empty:
        fig = Figure(figsize=(8, 4))
        ax = fig.subplots()
        ax.set_title("Top 10 Busiest Routes")
        ax.text(0.5, 0.5, "No flight data", ha="center", va="center")
        ax.set_axis_off()
        return _fig_to_png_bytes(fig)

    df["route"] = df["origin_airport_code"] + " -> " + df["destination_airport_code"]
    df = df.sort_values("flight_count", ascending=True)

    fig = Figure(figsize=(11, 6))
    ax = fig.subplots()
    ax.barh(df["route"], df["flight_count"], color="#38bdf8")
    ax.set_title("Top 10 Busiest Routes")
    ax.set_xlabel("Flight Count")
    ax.set_ylabel("Route")
    return _fig_to_png_bytes(fig)


def departure_times_distribution() -> bytes:
    query = text("SELECT departure_time FROM flight")
    df = pd.read_sql_query(query, engine)
    df["departure_time"] = pd.to_datetime(df["departure_time"], errors="coerce")
    hours = df["departure_time"].dropna().dt.hour

    fig = Figure(figsize=(10, 6))
    ax = fig.subplots()
    ax.hist(hours, bins=range(0, 25), edgecolor="black", color="#818cf8", align="left")
    ax.set_xticks(range(0, 24))
    ax.set_title("Departure Time Distribution by Hour")
    ax.set_xlabel("Hour of Day (24h)")
    ax.set_ylabel("Number of Flights")
    ax.grid(axis="y", linestyle="--", alpha=0.4)
    return _fig_to_png_bytes(fig)


def fleet_distribution_by_status_donut() -> bytes:
    query = text("SELECT aircraft_status FROM aircraft")
    df = pd.read_sql_query(query, engine)
    counts = df["aircraft_status"].fillna("UNKNOWN").value_counts()

    fig = Figure(figsize=(8, 8))
    ax = fig.subplots()

    if counts.empty:
        ax.set_title("Fleet Distribution by Status")
        ax.text(0.5, 0.5, "No aircraft data", ha="center", va="center")
        ax.set_axis_off()
        return _fig_to_png_bytes(fig)

    ax.pie(
        counts.values,
        labels=counts.index,
        autopct="%1.1f%%",
        startangle=90,
        wedgeprops={"width": 0.42, "edgecolor": "white"},
    )
    ax.set_title("Fleet Distribution by Status")
    ax.axis("equal")
    return _fig_to_png_bytes(fig)


def global_route_network_graph() -> bytes:
    airports_query = text(
        """
        SELECT airport_code, longitude, latitude
        FROM airport
        """
    )

    routes_query = text(
        """
        SELECT
            r.origin_airport_code,
            r.destination_airport_code,
            COUNT(f.flight_id) AS flight_count
        FROM route r
        LEFT JOIN flight f ON f.route_id = r.route_id
        GROUP BY r.origin_airport_code, r.destination_airport_code
        """
    )

    airports_df = pd.read_sql_query(airports_query, engine)
    routes_df = pd.read_sql_query(routes_query, engine)

    airports_df["longitude"] = pd.to_numeric(airports_df["longitude"], errors="coerce")
    airports_df["latitude"] = pd.to_numeric(airports_df["latitude"], errors="coerce")
    airports_df = airports_df.dropna(subset=["longitude", "latitude"])

    fig = Figure(figsize=(12, 8))
    ax = fig.subplots()

    if airports_df.empty:
        ax.set_title("Airline Route Network")
        ax.text(0.5, 0.5, "No airport coordinate data", ha="center", va="center")
        ax.set_axis_off()
        return _fig_to_png_bytes(fig)

    ap = airports_df.set_index("airport_code")

    ax.scatter(
        ap["longitude"],
        ap["latitude"],
        s=60,
        color="#0ea5e9",
        edgecolors="black",
        linewidths=0.7,
    )

    for code, row in ap.iterrows():
        ax.annotate(
            code,
            (row["longitude"], row["latitude"]),
            xytext=(5, 4),
            textcoords="offset points",
            fontsize=9,
        )

    for _, route in routes_df.iterrows():
        origin = route["origin_airport_code"]
        destination = route["destination_airport_code"]
        if origin not in ap.index or destination not in ap.index:
            continue

        start = ap.loc[origin]
        end = ap.loc[destination]
        width = max(0.8, min(4.0, 0.8 + float(route["flight_count"]) * 0.2))

        ax.plot(
            [start["longitude"], end["longitude"]],
            [start["latitude"], end["latitude"]],
            color="#94a3b8",
            alpha=0.5,
            linewidth=width,
        )

    ax.set_title("Airline Route Network")
    ax.set_xlabel("Longitude")
    ax.set_ylabel("Latitude")
    ax.grid(linestyle="--", alpha=0.25)
    return _fig_to_png_bytes(fig)


def available_charts() -> list[str]:
    return [
        "busiest-routes",
        "departure-hours",
        "fleet-status",
        "route-network",
    ]


def render_chart_png(chart_name: str) -> bytes:
    chart_map = {
        "busiest-routes": top_10_busiest_routes,
        "departure-hours": departure_times_distribution,
        "fleet-status": fleet_distribution_by_status_donut,
        "route-network": global_route_network_graph,
    }

    if chart_name not in chart_map:
        raise ValueError(f"Unknown chart '{chart_name}'")

    return chart_map[chart_name]()
