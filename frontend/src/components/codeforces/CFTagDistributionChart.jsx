import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CFTagDistributionChart = ({ submissions }) => {
  const tagData = useMemo(() => {
    const tagCount = {};
    submissions.forEach((submission) => {
      if (submission.verdict === 'OK') {
        submission.problem.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });

    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [submissions]);

  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg p-4 shadow-md mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Problem Tag Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={tagData}
          margin={{ top: 20, right: 30, left: 120, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" stroke="#ccc" />
          <YAxis
            type="category"
            dataKey="tag"
            width={130}
            tick={{ fill: '#ccc', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "white",
            }}
            formatter={(value) => [`${value} solved`, "Count"]}
          />
          <Bar dataKey="count" fill="#34d399" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CFTagDistributionChart;
