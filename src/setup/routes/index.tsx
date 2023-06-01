import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import User from "../../pages/Dashboard/Outlets/User";
import UserDetails from "../../pages/Dashboard/Outlets/UserDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="user" element={<User />} />
        <Route path="user/:id" element={<UserDetails />} />
      </Route>
    </Route>
  )
);

export { router };
