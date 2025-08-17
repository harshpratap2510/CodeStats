import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, format } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import "./heatMap.css"; // Make sure this file defines color-scale classes

const CodechefHeatmap = ({ contestHistory }) => {
  if (!contestHistory || contestHistory.length === 0) {
    return <p className="text-white">No contest history available.</p>;
  }

  const heatmapData = contestHistory.map((contest) => ({
    date: format(new Date(contest.date), "yyyy-MM-dd"),
    count: 1, // Each contest is 1 count
  }));

  const today = new Date();
  const startDate = addDays(today, -365);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        📅 CodeChef Contest Heatmap
      </h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return "color-scale-3"; // All contests shown at same intensity
          }}
          tooltipDataAttrs={(value) => ({
            "data-tip": value.date ? `Contest on ${value.date}` : "No data",
          })}
          showWeekdayLabels
        />
        <ReactTooltip />
      </div>
      <div className="flex justify-center gap-2 mt-4 text-xs text-gray-300">
        <span>Less</span>
        <div className="w-4 h-4 bg-[#ebedf0] rounded"></div>
        <div className="w-4 h-4 bg-[#7bc96f] rounded"></div>
        <div className="w-4 h-4 bg-[#239a3b] rounded"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CodechefHeatmap;
