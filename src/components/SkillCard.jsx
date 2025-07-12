import React from "react";

const SkillCard = ({ user }) => {
  return (
    <div className="border border-gray-700 rounded-xl p-4 bg-gray-800 flex items-start justify-between mb-4">
      {/* Left Info */}
      <div className="flex gap-4">
        {/* Profile Photo */}
        <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center text-sm text-white">
          Photo
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold">{user.name}</span>
            {user.badge && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {user.badge}
              </span>
            )}
            <span className="bg-red-800 text-white text-xs px-2 py-1 rounded-full">
              {user.username}
            </span>
          </div>

          <div className="mb-1">
            <span className="text-green-400">Skills Offered = </span>
            {user.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full mx-1"
              >
                {skill}
              </span>
            ))}
          </div>

          <div>
            <span className="text-blue-400">Skills Wanted =  </span>
            {user.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full mx-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end">
        <button className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-full text-white">
          Request
        </button>
        <span className="mt-2 text-sm text-yellow-400">
          rating {user.rating}/5
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
