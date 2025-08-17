import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, format } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./heatMap.css";



const LcSubmissionTrendChart = ({ submissionData }) => {
  if (!submissionData) return <p className="text-white">No submission data available.</p>;

  let parsedData;
  try {
    parsedData = typeof submissionData === "string" ? JSON.parse(submissionData) : submissionData;
  } catch (e) {
    return <p className="text-red-500">Invalid submission data format.</p>;
  }

  const heatmapData = Object.entries(parsedData).map(([timestamp, count]) => ({
    date: format(new Date(+timestamp * 1000), "yyyy-MM-dd"),
    count,
  }));

  const today = new Date();
  const startDate = addDays(today, -365);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">📅 LeetCode Submissions Heatmap</h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count >= 10) return "color-scale-4";
            if (value.count >= 5) return "color-scale-3";
            if (value.count >= 2) return "color-scale-2";
            return "color-scale-1";
          }}
          tooltipDataAttrs={(value) => ({
            "data-tip": value.date ? `${value.date}: ${value.count} submissions` : "No data",
          })}
          showWeekdayLabels
        />
        <ReactTooltip />
      </div>
      <div className="flex justify-center gap-2 mt-4 text-xs text-gray-300">
        <span>Less</span>
        <div className="w-4 h-4 bg-[#ebedf0] rounded"></div>
        <div className="w-4 h-4 bg-[#c6e48b] rounded"></div>
        <div className="w-4 h-4 bg-[#7bc96f] rounded"></div>
        <div className="w-4 h-4 bg-[#239a3b] rounded"></div>
        <div className="w-4 h-4 bg-[#196127] rounded"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default LcSubmissionTrendChart;
