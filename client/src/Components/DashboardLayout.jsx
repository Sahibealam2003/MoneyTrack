import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../Context/userContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {/* SideMenu only if user exists */}
        {user && (
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        {/* Main Content ALWAYS render */}
        <div className="flex-1 mx-5 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
