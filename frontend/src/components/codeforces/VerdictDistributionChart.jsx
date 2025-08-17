import { PieChart, Pie, Cell, Tooltip } from "recharts";

const verdictData = [
  { name: "WRONG_ANSWER", value: 40, color: "#f87171" },
  { name: "OK", value: 50, color: "#4ade80" },
  { name: "TIME_LIMIT_EXCEEDED", value: 10, color: "#60a5fa" },
  { name: "RUNTIME_ERROR", value: 5, color: "#f472b6" },
  { name: "COMPILATION_ERROR", value: 3, color: "#facc15" },
  { name: "MEMORY_LIMIT_EXCEEDED", value: 2, color: "#a78bfa" },
];

const VerdictDistributionCard = () => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Verdict Distribution</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Legend */}
        <div className="flex flex-col gap-3 text-sm">
          {verdictData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-4 h-4 inline-block rounded-sm"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name}
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <PieChart width={250} height={250}>
          <Pie
            data={verdictData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {verdictData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default VerdictDistributionCard;
