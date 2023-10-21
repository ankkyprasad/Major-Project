import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../shared/Input";
import AnimatedButton from "../shared/AnimatedButton";
import Loading from "../shared/Loading";

import { loginUser } from "../../services/apis/user";
import { userSliceActions } from "../../store/userSlice";

const Form = ({ setErrorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { signature, user } = response.data.data;

      localStorage.setItem("token", signature);
      dispatch(userSliceActions.loginUser({ user }));
      navigate("/");
    },
    onError: (response) => {
      setErrorMessage(response.data.message);
    },
  });

  const loginHandler = (event) => {
    event.preventDefault();

    if (!email) return setErrorMessage("Email is required!!");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return setErrorMessage("Invalid Email Address");

    if (!password) return setErrorMessage("Password is required!!");

    loginMutation.mutate({ email, password });
  };

  return (
    <form className="text-center">
      <Input
        label="Email"
        value={email}
        setValue={setEmail}
        type="email"
        additionalClass="my-6"
      />
      <Input
        label="Password"
        value={password}
        setValue={setPassword}
        type="password"
        additionalClass="my-6"
      />
      <AnimatedButton onClick={loginHandler}>
        {loginMutation.isPending ? <Loading /> : "Login"}
      </AnimatedButton>
    </form>
  );
};

export default Form;
