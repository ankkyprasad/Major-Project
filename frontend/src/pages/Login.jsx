import { useRef } from "react";

import Input from "../components/shared/Input";
import AnimatedButton from "../components/shared/AnimatedButton";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const loginHandler = (event) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    event.preventDefault();
  };

  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      <div className="w-2/5 m-auto bg-gray-100 px-32 py-8 rounded shadow-md border border-gray-200 ">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form className="text-center">
          <Input
            label="Email"
            ref={emailRef}
            type="email"
            additionalClass="my-6"
          />
          <Input
            label="Password"
            ref={passwordRef}
            type="password"
            additionalClass="my-6"
          />
          <AnimatedButton onClick={loginHandler}>Login</AnimatedButton>
        </form>
      </div>
    </div>
  );
};

export default Login;