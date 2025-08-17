// components/codeforces/ProblemRatingChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProblemRatingChart = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return <p className="text-white">No submission data available.</p>;
  }

  // Only count solved problems
  const solved = submissions.filter(
    (sub) => sub.verdict === "OK" && sub.problem.rating
  );

  const ratingCounts = solved.reduce((acc, sub) => {
    const rating = sub.problem.rating;
    acc[rating] = acc[rating] ? acc[rating] + 1 : 1;
    return acc;
  }, {});

  const data = Object.entries(ratingCounts)
    .map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }))
    .sort((a, b) => a.rating - b.rating);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Solved Problems by Rating
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="rating"
            stroke="#ccc"
            label={{ value: "Rating", position: "insideBottom", offset: -5 }}
          />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "white",
            }}
            formatter={(value) => [`${value} solved`, "Count"]}
          />
          <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProblemRatingChart;
