import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DifficultyChart = ({ LeetCode }) => {
  const difficultyData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [{
      label: "Problems Solved",
      data: [
        LeetCode?.matchedUser?.submitStats?.totalSubmissionNum[1]?.count || 0,
        LeetCode?.matchedUser?.submitStats?.totalSubmissionNum[2]?.count || 0,
        LeetCode?.matchedUser?.submitStats?.totalSubmissionNum[3]?.count || 0
      ],
      backgroundColor: [
        'rgba(40, 167, 69, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(220, 53, 69, 0.8)'
      ],
      borderColor: [
        'rgba(40, 167, 69, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(220, 53, 69, 1)'
      ],
      borderWidth: 1,
      hoverOffset: 15,
      borderRadius: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#E2E8F0',
          font: {
            size: 12,
            family: 'Inter'
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F8FAFC',
        bodyColor: '#E2E8F0',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return ` ${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%'
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all h-full">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">
        LeetCode Difficulty Breakdown
      </h3>
      <div className="relative h-64 w-full">
        <Pie 
          data={difficultyData} 
          options={options}
          plugins={[{
            id: 'customCenterText',
            beforeDraw: (chart) => {
              const { ctx, chartArea: { width, height } } = chart;
              ctx.save();
              ctx.font = 'bold 16px Inter';
              ctx.fillStyle = '#E2E8F0';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              ctx.fillText(`${total}`, width / 2, height / 2 - 10);
              ctx.font = '12px Inter';
              ctx.fillText('Total Solved', width / 2, height / 2 + 15);
            }
          }]}
        />
      </div>
    </div>
  );
};

export default DifficultyChart;