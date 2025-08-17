// components/codeforces/ProblemIndexChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ProblemIndexChart = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return <p className="text-white">No submission data available.</p>;
  }

  // Filter only solved submissions
  const solvedSubmissions = submissions.filter(
    (sub) => sub.verdict === "OK"
  );

  // Count solved problems by index (first letter of problem index)
  const indexCounts = solvedSubmissions.reduce((acc, sub) => {
    const index = sub.problem.index?.[0]; // e.g., 'A', 'B'
    if (!index) return acc;
    acc[index] = acc[index] ? acc[index] + 1 : 1;
    return acc;
  }, {});

  const data = Object.entries(indexCounts).map(([index, count]) => ({
    index,
    count,
  }));

  // Sort A to Z
  data.sort((a, b) => a.index.localeCompare(b.index));

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Solved Problems by Index
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="index" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "white",
            }}
            formatter={(value) => [`${value} solved`, "Count"]}
          />
          <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProblemIndexChart;
