import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../compnents/ProtectedRoute";
import LandingPage from "../pages/LandingPage/LandingPage";
import { GameRoom } from "../compnents/GameRoom";
import { PerformancePage } from "../pages/performance/PerformancePage"; // Import Performance Page

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
        ],
    },
] as RouteObject[]);
