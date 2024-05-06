import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BatteryIcon from "../assets/battery-active.svg";
import SolarIcon from "../assets/solar-active.svg";
import PowerIcon from "../assets/power-active.svg";
import AreaCharts from "../components/AreaChart";
import { ToggleButton } from "../components/ToggleButton";

const Dashboard = () => {
  const [isActive, setIsActive] = useState();
  const [message, setMessage] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://esp-node-server.onrender.com");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsSocketConnected(true);
    };

    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessage(JSON.parse(receivedMessage));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsSocketConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Header />
      {!isSocketConnected && (
        <div className="w-1/1 bg-red-400 m-2 mb-0 md:m-5 md:mb-0 text-white text-lg md:text-xl p-4 rounded-lg">
          Server Disconnected! Trying to reconnect.
        </div>
      )}
      {isSocketConnected && !message && (
        <div className="w-1/1 bg-orange-400 m-2 mb-0 md:m-5 md:mb-0 text-white text-lg md:text-xl p-4 rounded-lg">
          ESP controller not connected!
        </div>
      )}

      <div className="p-3 md:p-5">
        <div className="bg-white rounded-lg w-full">
          <div className="text-xl border-b p-3 md:p-5 text-indigo font-semibold">
            Energy Consumption
          </div>
          <div className="flex p-3 md:p-5 gap-x-2 md:gap-x-6 text-white">
            <div className="bg-bright-blue w-full rounded-lg px-3 py-3 md:p-6 md:flex justify-between">
              <div className="flex items-center justify-between">
                <img src={BatteryIcon} className="h-6 md:h-20" />
                <div className="md:hidden text-lg md:text-2xl font-bold">
                  Battery
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="hidden md:flex text-lg md:text-2xl font-bold">
                  Battery
                </div>
                <div className="text-xs md:text-sm mt-1">
                  Current battery level(V)
                </div>
                <div className="text-3xl md:text-5xl font-bold mt-3 md:mt-5">
                  {message ? message.batteryVoltage.toFixed(2) : 0}V
                </div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg px-3 py-3 md:p-6 md:flex justify-between">
              <div className="flex items-center justify-between">
                <img src={SolarIcon} className="h-6 md:h-20" />
                <div className="md:hidden text-lg md:text-2xl font-bold">
                  Panels
                </div>
              </div>
              <div className="flex  flex-col items-end">
                <div className="hidden md:flex text-lg md:text-2xl font-bold">
                  Panels
                </div>
                <div className="text-xs md:text-sm mt-1">
                  Current panel output(V)
                </div>
                <div className="text-3xl md:text-5xl font-bold mt-3 md:mt-5">
                  {message ? message.panelVoltage.toFixed(2) : 0}V
                </div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg px-3 py-3 md:p-6 md:flex justify-between">
              <div className="flex items-center  justify-between">
                <img src={PowerIcon} className="h-6 md:h-20" />
                <div className="md:hidden text-lg md:text-2xl font-bold">
                  Temp.
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="hidden md:flex text-lg md:text-2xl font-bold">
                  Temp.
                </div>
                <div className="text-xs md:text-sm mt-1">
                  Room Temperature(C)
                </div>
                <div className="text-3xl md:text-5xl font-bold mt-3 md:mt-5">
                  {message ? message.temperature.toFixed(2) : 0}C
                </div>
              </div>
            </div>
          </div>
          <div className="md:p-6">
            <div className="p-6 mb-0 md:mb-5 flex justify-between">
              <div className="text-lg md:text-xl">Energy Data</div>
              <div className="bg-indigo flex p-1 text-white rounded-lg">
                <ToggleButton
                  label="Export"
                  isActive={isActive}
                  onClick={() => {
                    setIsActive(true);
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
