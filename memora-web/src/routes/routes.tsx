import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../compnents/ProtectedRoute";
import LandingPage from "../pages/LandingPage/LandingPage";
import { GameRoom } from "../compnents/Games/GuessWhatGame/GuessWhatPage";
import { PerformancePage } from "../pages/performance/PerformancePage"; // Import Performance Page
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            {
                path: "/lobby",
                element: (
                    <ProtectedRoute>
                        <GameRoom />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/game/performance/:sessionId",
                element: (
                    <ProtectedRoute>
                        <PerformancePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dashboard/*",
                element: (
                    <Dashboard />
                ),
            },
        ],
    },
] as RouteObject[]);
