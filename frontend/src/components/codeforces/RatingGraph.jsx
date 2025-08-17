import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
} from "recharts";

const RatingGraph = ({ contestHistory }) => {
  if (!contestHistory || contestHistory.length === 0) {
    return <p className="text-white">No contest history available.</p>;
  }

  const sortedData = [...contestHistory].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg h-[350px]">
      <h2 className="text-lg font-semibold text-white mb-3">Rating Progression</h2>
      <ResponsiveContainer width="100%" height={270}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            stroke="#ccc"
          />
          <YAxis domain={['auto', 'auto']} stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "white" }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value, name) => [value, name === "newRating" ? "Rating" : name]}
          />
          <Line
            type="monotone"
            dataKey="newRating"
            stroke="#00bcd4"
            strokeWidth={2}
            dot={{ r: 2.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
