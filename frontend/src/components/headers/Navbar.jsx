import { NavLink } from "react-router-dom";

import AnimatedButton from "../shared/AnimatedButton";

const Navbar = () => {
  return (
    <nav className="px-4 py-3 bg-gray-100 shadow-md">
      <ul className="flex gap-8 flex-row-reverse w-3/4 m-auto">
        <NavLink to="/register">
          <AnimatedButton>Register</AnimatedButton>
        </NavLink>
        <NavLink to="/login">
          <AnimatedButton>Login</AnimatedButton>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
