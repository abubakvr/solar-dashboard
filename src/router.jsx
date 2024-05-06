import { createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        redirectTo: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/analytics",
        element: <Page2 />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
