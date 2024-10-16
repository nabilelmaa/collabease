import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import "./index.css";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Tasks from "./components/dashboard/Tasks";
import Teams from "./components/dashboard/Teams";
import Reports from "./components/dashboard/Reports";
import Layout from "./components/layout";
import Notifications from "./components/Notifications";
import Pricing from "./components/Pricing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/billing",
    element: <Pricing />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "tasks", element: <Tasks /> },
      { path: "teams", element: <Teams /> },
      { path: "reports", element: <Reports /> },
      { path: "Notifications", element: <Notifications /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
