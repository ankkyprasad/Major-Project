import { createBrowserRouter } from "react-router-dom";

import Root from "../../pages/Root";
import Home from "../../pages/Home";
import Login from "../../pages/users/Login";
import Register from "../../pages/users/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
