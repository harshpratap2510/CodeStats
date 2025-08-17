import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CodechefRatingChart = ({ ratingData }) => {
  if (!ratingData || ratingData.length === 0) {
    return <p className="text-white">No contest history available.</p>;
  }

  // Convert to chart-friendly format
  const formattedData = ratingData
    .map((entry) => ({
      date: `${entry.getyear}-${entry.getmonth.padStart(2, "0")}-${entry.getday.padStart(2, "0")}`,
      newRating: parseInt(entry.rating),
      contestName: entry.name,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg ">
      <h2 className="text-xl font-bold text-white mb-4 text-center">CodeChef Rating Progression</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
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
            formatter={(value, name, props) => [
              value,
              name === "newRating" ? `Rating (${props.payload.contestName})` : name,
            ]}
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

export default CodechefRatingChart;
