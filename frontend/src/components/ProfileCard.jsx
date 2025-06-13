import React, { useState } from "react";

const getInitialAndColor = (name) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-pink-400",
    "bg-purple-400",
  ];
  const color = colors[initial.charCodeAt(0) % colors.length];
  return { initial, color };
};

const ProfileCard = ({
  coverImage = "#",
  avatar,
  name = "Sarah Smith",
  email,
  phone,
  onFollow,
  onTabClick,
  activeTab = "Upcoming Appointments",
}) => {
  // Keep track of image loading error
  const [imgError, setImgError] = useState(false);
  
  // Get initial and color for the avatar fallback
  const { initial, color } = getInitialAndColor(name);
  
  // Each tab as [firstLine, secondLine]
  const tabLabels = [
    ["Upcoming", "Appointments"],
    ["Completed", "Appointments"],
    ["Likes", ""],
  ];
  const tabKeys = ["Upcoming Appointments", "Completed Appointments", "Likes"];

  return (
    <div className="max-w-4xl mx-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl rounded-lg text-gray-900 mb-2">
      {" "}
      <div className="rounded-t-lg h-40 overflow-hidden">
        {/* Optionally add a cover image here */}
      </div>
      <div className={`mx-auto w-36 h-36 relative -mt-30 border-4 border-white rounded-full overflow-hidden ${!avatar || imgError ? color : ''}`}>
        {avatar && !imgError ? (
          <img
            className="object-cover object-center h-36 w-36"
            src={avatar}
            alt="Avatar"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white font-semibold text-4xl">
            {initial}
          </div>
        )}
      </div>
      <div className="text-center mt-0">
        <h2 className="font-semibold text-2xl">{name}</h2>
        {email && <p className="text-gray-500">{email}</p>}
        {phone && <p className="text-gray-500">{phone}</p>}
      </div>
      {/* Tabs */}
      <div className="py-6 mt-2 ml-16 text-gray-700 flex flex-row items-center justify-center gap-8">
        {/* Upcoming Appointments */}
        <a
          key={tabKeys[0]}
          className={`px-2 py-1 font-semibold transition flex flex-col items-center text-center cursor-pointer
      ${
        activeTab === tabKeys[0]
          ? "text-[#e0559c]"
          : "text-gray-700 hover:text-[#e0559c]"
      }`}
          onClick={(e) => {
            e.preventDefault();
            onTabClick && onTabClick(tabKeys[0]);
          }}
          href="#"
        >
          <span>{tabLabels[0][0]}</span>
          {tabLabels[0][1] && <span>{tabLabels[0][1]}</span>}
        </a>
        {/* Completed Appointments - move left with mr-auto */}
        <a
          key={tabKeys[1]}
          className={`px-48 py-1 font-semibold transition flex flex-col items-center text-center cursor-pointer mr-auto
      ${
        activeTab === tabKeys[1]
          ? "text-[#e0559c]"
          : "text-gray-700 hover:text-[#e0559c]"
      }`}
          onClick={(e) => {
            e.preventDefault();
            onTabClick && onTabClick(tabKeys[1]);
          }}
          href="#"
        >
          <span>{tabLabels[1][0]}</span>
          {tabLabels[1][1] && <span>{tabLabels[1][1]}</span>}
        </a>
        {/* Likes */}
        <a
          key={tabKeys[2]}
          className={`px-2 py-1 mr-16 font-semibold transition flex flex-col items-center text-center cursor-pointer
      ${
        activeTab === tabKeys[2]
          ? "text-[#e0559c]"
          : "text-gray-700 hover:text-[#e0559c]"
      }`}
          onClick={(e) => {
            e.preventDefault();
            onTabClick && onTabClick(tabKeys[2]);
          }}
          href="#"
        >
          <span>{tabLabels[2][0]}</span>
          {tabLabels[2][1] && <span>{tabLabels[2][1]}</span>}
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;