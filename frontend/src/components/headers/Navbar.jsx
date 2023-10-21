import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import AnimatedButton from "../shared/AnimatedButton";
import Loading from "../shared/Loading";

import { logout } from "../../services/apis/user";
import { revokeTokenThunk } from "../../store/userSlice";

const Navbar = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(revokeTokenThunk());
      navigate("/");
    },
  });

  const logoutButtonClickHandler = () => {
    logoutMutation.mutate();
  };

  const navbarComponents = userState.isLoggedIn ? (
    <AnimatedButton onClick={logoutButtonClickHandler}>
      {logoutMutation.isPending ? <Loading /> : "Logout"}
    </AnimatedButton>
  ) : (
    <>
      <NavLink to="/register">
        <AnimatedButton>Register</AnimatedButton>
      </NavLink>
      <NavLink to="/login">
        <AnimatedButton>Login</AnimatedButton>
      </NavLink>
    </>
  );

  return (
    <nav className="px-4 py-3 bg-gray-100 shadow-md">
      <ul className="flex gap-8 flex-row-reverse w-3/4 m-auto">
        {navbarComponents}
      </ul>
    </nav>
  );
};

export default Navbar;
