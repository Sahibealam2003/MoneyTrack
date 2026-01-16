import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../Utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import CharAvatar from "./Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)]
 bg-white  shadow-md flex flex-col">

      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-200">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-violet-500"
          />
        ) : (
          <CharAvatar
            name={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="mt-3 text-sm font-semibold text-gray-800">
          {user?.name || ""}
        </h5>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mt-4 flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-sm px-6 py-3 transition-all
                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                }`}
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
