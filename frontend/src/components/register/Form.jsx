import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Input from "../shared/Input";
import AnimatedButton from "../shared/AnimatedButton";
import Loading from "../shared/Loading";

import { registerUser } from "../../services/apis/user";

const Form = ({ setErrorMessage }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (response) => {
      setErrorMessage(response.data.message);
    },
  });

  const registerHandler = (event) => {
    event.preventDefault();

    if (!name) return setErrorMessage("Name cannot be empty!!");

    if (name.length < 3)
      return setErrorMessage("Minimum length of name should be greater than 2");

    if (!email) return setErrorMessage("Email is required!!");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return setErrorMessage("Invalid Email Address");

    if (!password) return setErrorMessage("Password is required!!");

    if (password.length < 8)
      return setErrorMessage(
        "Minimum length of password should be greater than or equal to 8"
      );

    if (password !== confirmPassword)
      return setErrorMessage("Password does not match");

    registerMutation.mutate({ name, email, password });
  };

  return (
    <form className="text-center">
      <Input
        label="Name"
        value={name}
        setValue={setName}
        type="text"
        additionalClass="my-6"
      />

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

      <Input
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        type="password"
        additionalClass="my-6"
      />

      <AnimatedButton onClick={registerHandler}>
        {registerMutation.isPending ? <Loading /> : "Register"}
      </AnimatedButton>
    </form>
  );
};

export default Form;
