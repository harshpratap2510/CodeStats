import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DifficultyBarChart = ({ solvedStats }) => {
  const chartData = [
    {
      difficulty: "Basic",
      count: solvedStats.basic?.count || 0,
    },
    {
      difficulty: "Easy",
      count: solvedStats.easy?.count || 0,
    },
    {
      difficulty: "Medium",
      count: solvedStats.medium?.count || 0,
    },
    {
      difficulty: "Hard",
      count: solvedStats.hard?.count || 0,
    },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Problems Solved by Difficulty</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          {/* X Axis */}
          <XAxis
            dataKey="difficulty"
            tick={{ fontSize: 14, fill: "#FFFFFF" }} // White text for ticks
            axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }} // Yellow axis line
            padding={{ left: 20, right: 20 }} // Add padding for better space
          />
          
          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 14, fill: "#FFFFFF" }} // White text for ticks
            axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }} // Yellow axis line
            tickMargin={10} // Adjust the space between ticks and the axis line
          />

          {/* Tooltip and Legend */}
          <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", borderColor: "#FBBF24", color: "#FBBF24" }} />
          <Legend verticalAlign="bottom" wrapperStyle={{ color: "#FFFFFF" }} /> {/* White color for legend text */}

          {/* Bars */}
          <Bar dataKey="count" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyBarChart;
