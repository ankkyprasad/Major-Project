import { Outlet } from "react-router-dom";

import Navbar from "../components/headers/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
