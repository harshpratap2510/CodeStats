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

// Helper function to format the date as "MMM YY" (e.g., "Jan 24")
const formatDate = (date) => {
  const options = { year: '2-digit', month: 'short' }; // Using '2-digit' year and 'short' month
  return new Date(date).toLocaleDateString('en-US', options);
};

// Helper function to get the start of a 3-month period
const getThreeMonthPeriodStart = (date) => {
  const currentDate = new Date(date);
  const month = currentDate.getMonth();
  const startMonth = Math.floor(month / 3) * 3; // Get the start of the 3-month period

  currentDate.setMonth(startMonth);
  currentDate.setDate(1); // Set to the 1st day of the month
  return currentDate;
};

const DifficultyProgressionChart = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return <p className="text-white">No submission data available.</p>;
  }

  // Get today's date and filter submissions for the past 2 years
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  // Filter only successful submissions
  const solved = submissions.filter(
    (sub) => sub.verdict === "OK" && sub.problem.rating && sub.time * 1000 >= twoYearsAgo.getTime()
  );

  // Group problems by 3-month intervals and calculate average rating
  const dateRatings = solved.reduce((acc, sub) => {
    const periodStart = getThreeMonthPeriodStart(sub.time * 1000); // Get the start of the 3-month period
    const periodStartFormatted = formatDate(periodStart); // Format the period for display

    const rating = sub.problem.rating;

    if (!acc[periodStartFormatted]) {
      acc[periodStartFormatted] = { totalRating: 0, count: 0 };
    }

    acc[periodStartFormatted].totalRating += rating;
    acc[periodStartFormatted].count += 1;

    return acc;
  }, {});

  const data = Object.entries(dateRatings)
  .map(([periodLabel, { totalRating, count }]) => {
    // Convert periodLabel like "Jan 24" back to actual Date (not reliable), so we store full Date instead
    const [monthStr, yearStr] = periodLabel.split(" ");
    const fullDate = new Date(`${monthStr} 1, 20${yearStr}`);
    return {
      period: fullDate,
      label: periodLabel,
      avgRating: totalRating / count,
    };
  })
  .sort((a, b) => a.period - b.period);


  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Difficulty Progression Over Time (Last 2 Years, 3-Month Gaps)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
  dataKey="label"
  stroke="#ccc"
  interval={0}
  tick={{ dy: 10 }}
/>

          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "white",
            }}
            formatter={(value) => [`Avg Rating: ${value.toFixed(2)}`, "Average Rating"]}
          />
          <Line
            type="monotone"
            dataKey="avgRating"
            stroke="#34d399"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyProgressionChart;
