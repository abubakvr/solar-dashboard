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

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 4000,
    pv: 4500,
    amt: 2400,
  },
  {
    name: "Sep",
    uv: 3000,
    pv: 5000,
    amt: 2210,
  },
  {
    name: "Oct",
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: "Nov",
    uv: 2780,
    pv: 6308,
    amt: 2000,
  },
  {
    name: "Dec",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

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
    <div className="w-full" style={{ height: "330px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ left: -15, top: 0, bottom: 0 }}>
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
            dataKey="name"
            tick={{
              fontSize: 12,
              fill: "#080817",
              fontWeight: "500",
            }}
          />
          <YAxis
            tickFormatter={(data) => {
              return `${data / 1000}kW`;
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
          <Tooltip />
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
