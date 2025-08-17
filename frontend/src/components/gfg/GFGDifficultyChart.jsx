import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171"]; // Dark Yellow, Green, Blue, Red (mapped to Basic, Easy, Medium, Hard)

const GFGDifficultyChart = ({ solvedStats }) => {
  const chartData = [
    { name: "Basic", value: solvedStats.basic?.count || 0 },
    { name: "Easy", value: solvedStats.easy?.count || 0 },
    { name: "Medium", value: solvedStats.medium?.count || 0 },
    { name: "Hard", value: solvedStats.hard?.count || 0 },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Problems Solved by Difficulty</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", borderColor: "#FBBF24", color: "#FBBF24" }} />
          <Legend verticalAlign="bottom" wrapperStyle={{ color: "#ffffff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GFGDifficultyChart;
