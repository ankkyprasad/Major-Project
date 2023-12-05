import React from "react";

const UserDashboard = () => {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-3xl font-semibold py-2">Welcome to Your Dashboard</h1>
      </header>
      <main className="mx-auto p-4 flex-1">
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Hello, User!</h2>
          <p className="text-gray-700">
            You've entered your post-quantum cloud app's user dashboard. It's
            time to explore and create amazing things.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
