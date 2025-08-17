import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4caf50", "#ffc107", "#f44336"]; // green, amber, red
const cardStyle =
  "bg-gray-900 border border-yellow-700 text-yellow-200 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center";

const LcDifficultyChart = ({ lcData }) => {
  if (!lcData || !lcData.matchedUser?.submitStats?.acSubmissionNum) {
    return <p className="text-white">No difficulty data available.</p>;
  }

  const difficultyStats = lcData.matchedUser.submitStats.acSubmissionNum;

  const data = [
    {
      name: "Easy",
      value: difficultyStats[1]?.count || 0, // index 1 = Easy
    },
    {
      name: "Medium",
      value: difficultyStats[2]?.count || 0, // index 2 = Medium
    },
    {
      name: "Hard",
      value: difficultyStats[3]?.count || 0, // index 3 = Hard
    },
  ];

  return (
    <div className={cardStyle} >
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">
        Problems by Difficulty
      </h2>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              // innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              // paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderColor: "#ffc107" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#ffc107" }}
            />
            <Legend wrapperStyle={{ color: "#ffc107" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LcDifficultyChart;
