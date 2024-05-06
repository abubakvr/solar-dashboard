import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import DashboardIcon from "../assets/dashboard-icon.svg";
import DashboardIconActive from "../assets/dashboard-active.svg";
import PowerIcon from "../assets/power-icon.svg";
import PowerIconActive from "../assets/power-active.svg";
import SolarIcon from "../assets/solar-icon.svg";
import SolarIconActive from "../assets/solar-active.svg";
import WindIcon from "../assets/wind-icon.svg";
import WindIconActive from "../assets/wind-active.svg";
import BatteryIcon from "../assets/battery-icon.svg";
import BatteryIconActive from "../assets/battery-active.svg";

const appLinks = [
  {
    name: "Dashboard",
    url: "/dashboard",
    logo: DashboardIcon,
    activeLogo: DashboardIconActive,
  },
  {
    name: "Analytics",
    url: "/analytics",
    logo: PowerIcon,
    activeLogo: PowerIconActive,
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col bg-indigo text-white h-screen w-1/6 py-4 fixed top-0">
        <div className="flex gap-2 items-center mt-5 px-4">
          <img src={Logo} className="w-6" />
          <h1 className="text-xl font-bold">Egauge</h1>
        </div>
        <div className="mt-12 text-pastel-blue">
          <div className="uppercase text-sm px-4">Main menu</div>
          <ul className="mt-5 ">
            {appLinks.map((item, index) => {
              return (
                <Link
                  to={item.url}
                  key={index}
                  className={`grid grid-cols-7 py-3 items-center px-4 hover:bg-bright-blue hover:text-white ${
                    location.pathname === item.url
                      ? "bg-bright-blue text-white"
                      : ""
                  }`}
                >
                  <div className="col-span-1 grid">
                    <div className="w-5 flex justify-center">
                      <img
                        src={
                          location.pathname === item.url
                            ? item.activeLogo
                            : item.logo
                        }
                        className="h-5"
                      />
                    </div>
                  </div>

                  <div className="col-span-6">{item.name}</div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-pale-blue md:ml-60 lg:ml-72 h-max">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
