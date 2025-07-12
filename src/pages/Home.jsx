import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 6;

//   console.log("Selected Filter: ", availabilityFilter);
//   console.log("User Availabilities:", users.map((u) => u.availability));

  // ✅ Load all users from backend
  useEffect(() => {
    axios
      .get("/api/user/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Failed to load users:", err));
  }, []);

  // ✅ Filter users by selected availability
  const filteredUsers = availabilityFilter
  ? users.filter(
      (user) =>
        Array.isArray(user.availability) &&
        user.availability
          .map((a) => a.toLowerCase())
          .includes(availabilityFilter.toLowerCase())
    )
  : users;


  // ✅ Pagination calculation
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      {/* 👇 Navbar with availability filter */}
      <Navbar onFilterChange={setAvailabilityFilter} />

      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Skill Swap Listings</h2>

        {/* ✅ Show filtered user cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {currentUsers.map((user) => (
            <SkillCard key={user._id} user={user} />
          ))}
        </div>
      </div>

      {/* 👇 Footer-style pagination */}
      <div className="py-4 bg-gray-800 text-center">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};




export default Home;
