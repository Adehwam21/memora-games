import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../compnents/ProtectedRoute";
import LandingPage from "../pages/LandingPage/LandingPage";
import { GameRoom } from "../compnents/GameRoom";

// Define the routes with proper TypeScript typings
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
            }
        ]
    },
    ] as RouteObject[]); 
