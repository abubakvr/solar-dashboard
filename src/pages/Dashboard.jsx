import React, { useState } from "react";
import Header from "../components/Header";
import BatteryIcon from "../assets/battery-active.svg";
import SolarIcon from "../assets/solar-active.svg";
import PowerIcon from "../assets/power-active.svg";
import AreaCharts from "../components/AreaChart";
import { ToggleButton } from "../components/ToggleButton";

const Dashboard = () => {
  const [isActive, setIsActive] = useState();

  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="bg-white rounded-lg w-full">
          <div className="text-xl border-b p-5 text-indigo font-semibold">
            Energy Consumption
          </div>
          <div className="flex p-5 gap-x-6 text-white">
            <div className="bg-bright-blue w-full rounded-lg p-6 flex justify-between">
              <div>
                <img src={BatteryIcon} className="h-20" />
              </div>
              <div className="flex  flex-col items-end">
                <div className="text-2xl font-bold">Battery</div>
                <div className="text-sm mt-1">Current battery level(kWH)</div>
                <div className="text-5xl font-bold mt-5">48V</div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg p-6 flex justify-between">
              <div>
                <img src={SolarIcon} className="h-20" />
              </div>
              <div className="flex  flex-col items-end">
                <div className="text-2xl font-bold">Panels</div>
                <div className="text-sm mt-1">Current panel output(kWH)</div>
                <div className="text-5xl font-bold mt-5">1.5KW</div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg p-6 flex justify-between">
              <div>
                <img src={PowerIcon} className="h-20" />
              </div>
              <div className="flex  flex-col items-end">
                <div className="text-2xl font-bold">Load</div>
                <div className="text-sm mt-1">Energy consumption(kWH)</div>
                <div className="text-5xl font-bold mt-5">0.9KW</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-10 flex justify-between">
              <div className="text-xl">User activity</div>
              <div className="bg-indigo flex p-1 text-white rounded-lg">
                <ToggleButton
                  label="30 days"
                  isActive={isActive}
                  onClick={() => {
                    setIsActive(true);
                  }}
                />
                <ToggleButton
                  label="7 days"
                  isActive={!isActive}
                  onClick={() => {
                    setIsActive(false);
                  }}
                />
              </div>
            </div>
            <AreaCharts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
