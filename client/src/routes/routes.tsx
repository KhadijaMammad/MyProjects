import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login";
import ProtectedRoute from "./ProtectedRouter";
import MainPage from "../pages/mainPage";
import Layout from "../components/layouts/mainLayout";
import News from "../components/news";
import Notes from "../components/notes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    ),
    children: [
        {
            index: true,
            element: <MainPage />,
        },
        {
          path: "/news",
          element: <News/>
        },
        {
          path: "/notes",
          element: <Notes />
        }

    ]
  },
]);
