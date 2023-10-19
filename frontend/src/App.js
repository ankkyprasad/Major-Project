import { RouterProvider } from "react-router-dom";

import router from "./services/router/router";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
