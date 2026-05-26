import { createBrowserRouter } from "react-router";
import Login from "@/features/auth/ui/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export { router };
