import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Skill Swap Listings</h2>
        {/* Next step: user cards will come here */}
      </div>
    </div>
  );
};

export default Home;
