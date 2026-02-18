import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import FlightOpsPage from "@/pages/FlightOpsPage";
import RoutesPage from "@/pages/RoutesPage";
import RouteDetailPage from "@/pages/RouteDetailPage";
import ResourcesPage from "@/pages/ResourcesPage";
import VisualizationsPage from "@/pages/VisualizationsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/flight-ops" element={<FlightOpsPage />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/routes/:routeId" element={<RouteDetailPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/visualizations" element={<VisualizationsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
