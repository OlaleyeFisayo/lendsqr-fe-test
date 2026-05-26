import { createBrowserRouter } from "react-router";
import Login from "@/features/auth/ui/pages/login";
import MainLayout from "@/features/dashboard/ui/layouts/main-layout";
import UserDetail from "@/features/dashboard/ui/pages/user-detail";
import Users from "@/features/dashboard/ui/pages/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <UserDetail />,
      },
    ],
  },
]);

export { router };
