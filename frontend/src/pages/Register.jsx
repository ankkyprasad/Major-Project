import { useState } from "react";

import Input from "../components/shared/Input";
import AnimatedButton from "../components/shared/AnimatedButton";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      <div className="w-2/5 m-auto bg-gray-100 px-32 py-8 rounded shadow-md border border-gray-200 ">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
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
          <AnimatedButton onClick={registerHandler}>Register</AnimatedButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
