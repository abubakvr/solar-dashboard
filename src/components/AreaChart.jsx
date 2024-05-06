import React, { useState } from "react";
import { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createTimestamps, findNearestIndex } from "../utils/helpers";

const CustomTooltip = (props) => {
  const dataPoint = props?.payload?.[0];

  const formattedDate = () => {
    if (dataPoint) {
      const date = new Date(dataPoint?.payload?.timePoint * 1000);
      const monthName = date.toLocaleString("en-US", { month: "short" });
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      return `${monthName} ${date.getDate()}, ${time}`;
    }
    return "";
  };

  return (
    <div
      data-testid="custom-tooltip"
      className="tooltip-bg rounded-lg p-4 pb-2 auto text-lg"
    >
      <div className="text-[#fff] pb-3 font-bold">
        {formattedDate && <div>{formattedDate()}</div>}
      </div>
      <div className="grid grid-cols-3 justify-between gap-y-2 gap-x-2 mb-2 font-bold">
        <div className="text-[#fff] col-span-2">Temperature:</div>
        <div className="text-[#fff] col-span-1">
          {dataPoint?.payload.temperature}
        </div>
        <div className="text-[#fff] col-span-2">Panel:</div>
        <div className="text-[#fff] col-span-1">
          {dataPoint?.payload.panelVoltage}
        </div>

        <div className="text-[#fff] col-span-2 ">Battery:</div>
        <div className="text-[#fff] col-span-1">
          {dataPoint?.payload.batteryVoltage}
        </div>
      </div>
    </div>
  );
};

const AreaCharts = () => {
  const graphTimes = createTimestamps(0.0061, 15);
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const getGraphData = async () => {
      try {
        const response = await fetch(
          "https://esp-node-server.onrender.com/latest-data"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const events = await response.json();
        const eventTimestamps = events
          .reverse()
          .map((item) => Math.floor(item.timestamp / 1000));

        const eventsToGraph = graphTimes.map((timestamp) => {
          const index = findNearestIndex(eventTimestamps, timestamp);
          const event = index !== -1 ? events[index] : null;

          return event ? { ...event, timePoint: timestamp } : null;
        });

        console.log(graphTimes);
        setChartData(eventsToGraph);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        throw error;
      }
    };

    getGraphData();
  }, []);

  return (
    <div className="w-full h-[200px] md:h-[330px] overflow-x-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          className="-ml-[10px] md:-ml-[15px]"
          margin={{ top: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timePoint"
            tickFormatter={(data) => {
              const date = new Date(data * 1000);
              return `${date.getHours()} : ${date.getMinutes()}`;
            }}
            tick={{
              fontSize: 12,
              fill: "#080817",
              fontWeight: "500",
            }}
          />
          <YAxis
            tickFormatter={(data) => {
              return `${data}v`;
            }}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fill: "#080817",
              fontWeight: "500",
            }}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeWidth={0.4}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Area
            type="monotone"
            dataKey="panelVoltage"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="batteryVoltage"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaCharts;
