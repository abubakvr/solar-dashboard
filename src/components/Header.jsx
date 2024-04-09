import React from "react";
import MenuIcon from "../assets/menu-icon.svg";

const Header = () => {
  return (
    <div className="flex justify-between items-center border-b px-6 py-5 bg-white ">
      <div className="text-indigo text-xl">Dashboard</div>
      <div className="flex justify-center items-center gap-x-2">
        <div className="rounded-full w-12 h-12 bg-pale-blue flex justify-center items-center">
          JD
        </div>
        <div>John Doe</div>
        <img src={MenuIcon} className="h-4" />
      </div>
    </div>
  );
};

export default Header;
