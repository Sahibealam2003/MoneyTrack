import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 right-0 h-16
 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      
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
  <div className="fixed inset-0 z-40 bg-black/40 min-[1080px]:hidden">
    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
      <SideMenu activeMenu={activeMenu} />
    </div>
  </div>
)}
    </div>
  );
};

export default Navbar;
