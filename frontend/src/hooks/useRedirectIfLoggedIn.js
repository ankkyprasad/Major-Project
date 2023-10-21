import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.isLoggedIn) {
      navigate("/");
    }
  }, [userState.isLoggedIn, navigate]);
};

export default useRedirectIfLoggedIn;
