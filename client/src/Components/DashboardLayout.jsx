import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../Context/userContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gray-50 overflow-hidden ">
      <div className="fixed top-0 left-0 right-0 h-16 z-20">
        <Navbar activeMenu={activeMenu} />
      </div>

      <div className="mt-10">
        {/* SideMenu only if user exists */}
        {user && (
          <div className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        {/* Main Content ALWAYS render */}
         <div
          className={`h-[calc(100vh-4rem)] overflow-y-auto px-5
          ${user ? "min-[1080px]:ml-64" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
