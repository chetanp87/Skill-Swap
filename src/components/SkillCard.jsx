import React, { useEffect, useState } from "react";


const SkillCard = ({ user }) => {
  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  const badgeColor = [
    "bg-purple-700",
    "bg-green-700",
    "bg-orange-600",
    "bg-pink-600",
    "bg-yellow-600",
  ][user.name?.charCodeAt(0) % 5];


  const [fixedRating, setFixedRating] = useState(4.5);

//   useEffect(() => {
//     const random = (Math.random() * 2 + 3).toFixed(1);
//     setFixedRating(random);
//   }, []);

  const rating = user.rating || fixedRating;

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow p-5 w-full max-w-md mx-auto">
      {/* Top: Avatar + Name + Rating */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold">
            {initial}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
          </div>
        </div>
        <span className="text-yellow-400 text-sm">⭐ {rating}/5</span>
      </div>

      {/* Skills Offered */}
      <p className="text-green-300 text-sm mb-1">Skills Offered:</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {user.offers?.map((skill, i) => (
          <span key={i} className="bg-green-600 px-2 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>

      {/* Skills Wanted */}
      <p className="text-blue-300 text-sm mb-1">Skills Wanted:</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {user.wants?.map((skill, i) => (
          <span key={i} className="border px-2 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>

      {/* ✅ Availability */}
      <p className="text-gray-400 text-sm mb-4">
        <span className="font-medium text-white">Availability:</span>{" "}
        {user.availability || "Not set"}
      </p>

      {/* Request Button */}
      <button className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded">
        Request
      </button>
    </div>
  );
};

export default SkillCard;
