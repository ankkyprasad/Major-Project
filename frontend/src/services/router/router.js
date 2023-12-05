import { createBrowserRouter } from "react-router-dom";

import Root from "../../pages/Root";
import Home from "../../pages/Home";
import Login from "../../pages/users/Login";
import Register from "../../pages/users/Register";
import UserDashboard from "../../components/dashboards/UserDashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element:<Register /> },
      { path: "/user-dashboard", element: <UserDashboard /> }
    ],
  },
]);

export default router;
