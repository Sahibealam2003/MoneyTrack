import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 relative">
      
      {/* Menu Button → ONLY mobile */}
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="text-2xl text-gray-700 min-[1080px]:hidden"
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        Money Track
      </h2>

      {/* Mobile SideMenu */}
      {openSideMenu && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg min-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
