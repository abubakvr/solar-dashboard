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

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Connected to frontend");
    };

    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log("Received message from server:", receivedMessage);
      setMessage(JSON.parse(receivedMessage));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

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
                <div className="text-sm mt-1">Current battery level(W)</div>
                <div className="text-5xl font-bold mt-5">
                  {message ? message.batteryVoltage.toFixed(2) : 0}W
                </div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg p-6 flex justify-between">
              <div>
                <img src={SolarIcon} className="h-20" />
              </div>
              <div className="flex  flex-col items-end">
                <div className="text-2xl font-bold">Panels</div>
                <div className="text-sm mt-1">Current panel output(W)</div>
                <div className="text-5xl font-bold mt-5">
                  {message ? message.panelVoltage.toFixed(2) : 0}W
                </div>
              </div>
            </div>
            <div className="bg-bright-blue w-full rounded-lg p-6 flex justify-between">
              <div>
                <img src={PowerIcon} className="h-20" />
              </div>
              <div className="flex  flex-col items-end">
                <div className="text-2xl font-bold">Temp.</div>
                <div className="text-sm mt-1">Room Temperature(C)</div>
                <div className="text-5xl font-bold mt-5">
                  {message ? message.temperature.toFixed(2) : 0}C
                </div>
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
