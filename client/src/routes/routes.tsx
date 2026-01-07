import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login";
import ProtectedRoute from "./ProtectedRouter";
import Sidebar from "../components/layouts/sidebar";
import MainPage from "../pages/mainPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Sidebar  />
      </ProtectedRoute>
    ),
    children: [
        {
            index: true,
            element: <MainPage />,
        }
    ]
  },
]);
