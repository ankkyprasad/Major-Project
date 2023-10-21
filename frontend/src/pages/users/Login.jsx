import { useState } from "react";

import Form from "../../components/login/Form";
import MessageCard from "../../components/shared/MessageCard";

import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";

const Login = () => {
  useRedirectIfLoggedIn();

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      <div className="w-2/5">
        {errorMessage && (
          <MessageCard
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            type="error"
          />
        )}

        <div className="m-auto bg-gray-100 px-32 py-8 rounded shadow-md border border-gray-200 ">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
          <Form setErrorMessage={setErrorMessage} />
        </div>
      </div>
    </div>
  );
};

export default Login;
