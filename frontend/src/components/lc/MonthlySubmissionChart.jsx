import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

const MonthlySubmissionChart = ({ submissionData }) => {
  if (!submissionData) return <p className="text-white">No submission data available.</p>;

  // Parse input (string or object)
  let parsedData;
  try {
    parsedData = typeof submissionData === "string" ? JSON.parse(submissionData) : submissionData;
  } catch (e) {
    return <p className="text-red-500">Invalid submission data format.</p>;
  }

  // Group data by month and sum counts
  const monthlyMap = {};

  Object.entries(parsedData).forEach(([timestamp, count]) => {
    // timestamp in seconds → JS Date
    const date = new Date(+timestamp * 1000);

    // Format month as 'YYYY-MM'
    const monthKey = format(date, "yyyy-MM");

    monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + count;
  });

  // Convert monthlyMap to sorted array
  const data = Object.entries(monthlyMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg h-[350px]">
      <h2 className="text-lg font-semibold text-white mb-3">Monthly Submission Count</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="month" 
            stroke="#ccc"
            tickFormatter={(str) => {
              // Format "YYYY-MM" → "MMM yy"
              const parsedDate = parseISO(str + "-01");
              return format(parsedDate, "MMM yy");
            }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#ccc" />
          <Tooltip 
            formatter={(value) => [`${value} submissions`, "Submissions"]} 
            labelFormatter={(label) => {
              const parsedDate = parseISO(label + "-01");
              return format(parsedDate, "MMMM yyyy");
            }}
          />
          <Bar dataKey="count" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySubmissionChart;
