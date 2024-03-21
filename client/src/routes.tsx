import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import RequireAuth from "./components/requireAuth";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BaseModel from "./pages/baseModel";
import Resource from "./pages/resource";
import Bots from "./pages/bots";
import BotChat from "./pages/bot-chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/select-model" replace />,
      },
      {
        path: "/select-model",
        element: <BaseModel />,
      },
      {
        path: "/select-resource",
        element: <Resource />,
      },
      {
        path: "/bots",
        element: <Bots />,
      },
      {
        path: "/bot/:botId",
        element: <BotChat />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
