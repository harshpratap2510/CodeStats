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

const CcRankingGraph = ({ ratingData }) => {
  if (!ratingData || ratingData.length === 0) {
    return <p className="text-white">No contest data available.</p>;
  }

  // Format the data with date, rank, rating, name, and division
  const data = ratingData
    .map((item) => {
      const date = new Date(item.getyear, item.getmonth - 1, item.getday).toISOString().slice(0, 10);
      const rank = Number(item.rank);
      const rating = Number(item.rating);
      const name = item.name;

      // Extract division from name
      const divisionMatch = name.match(/Division\s+\d/);
      const division = divisionMatch ? divisionMatch[0] : "Unknown";

      return { date, rank, rating, name, division };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        Ranking Progression
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#ccc"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="rank"
            reversed={true} // Smaller rank higher on chart
            stroke="#ccc"
            allowDecimals={false}
            domain={["dataMin", "dataMax"]}
            label={{
              value: "Rank",
              angle: -90,
              position: "insideLeft",
              fill: "#ccc",
            }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload;
                return (
                  <div className="bg-gray-800 text-white p-3 rounded shadow-lg text-sm">
                    <p><strong>Date:</strong> {new Date(label).toLocaleDateString()}</p>
                    <p><strong>Rank:</strong> #{dataPoint.rank}</p>
                    {/* <p><strong>Rating:</strong> {dataPoint.rating}</p> */}
                    {/* <p><strong>Division:</strong> {dataPoint.division}</p> */}
                    <p><strong>Contest:</strong> {dataPoint.name}</p>
                  </div>
                );
              }
              return null;
            }}
            wrapperStyle={{ outline: "none" }}
          />
          <Line
            type="monotone"
            dataKey="rank"
            stroke="#ff5722"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "#ff5722" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CcRankingGraph;
