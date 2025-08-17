import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TotalSolvedChart = ({ leetcode, codechef, codeforces, gfg }) => {
  const data = {
    labels: ["LeetCode", "Codeforces", "GeeksForGeeks"],
    datasets: [
      {
        label: "Problems Solved",
        data: [
          leetcode?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.count || 0,
          codeforces?.totalSolved || 0,
          gfg?.info?.totalProblemsSolved || 0,
        ],
        backgroundColor: [
          'rgba(255, 161, 22, 0.7)',
          'rgba(31, 138, 203, 0.7)',
          'rgba(76, 175, 80, 0.7)'
        ],
        borderColor: [
          'rgba(255, 161, 22, 1)',
          'rgba(31, 138, 203, 1)',
          'rgba(76, 175, 80, 1)'
        ],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: [
          'rgba(255, 161, 22, 0.9)',
          'rgba(31, 138, 203, 0.9)',
          'rgba(76, 175, 80, 0.9)'
        ],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        labels: {
          color: '#E2E8F0',
          font: {
            size: 12
          },
          boxWidth: 12,
          padding: 16
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
            return ` ${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#94A3B8',
          stepSize: 100
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94A3B8'
        }
      }
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all h-full">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">
        Total Problems Solved
      </h3>
      <div className="relative h-64 w-full">
        <Bar 
          data={data} 
          options={options} 
          plugins={[{
            id: 'customBackground',
            beforeDraw: (chart) => {
              const {ctx, chartArea: {top, right, bottom, left, width, height}} = chart;
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
              ctx.fillRect(left, top, width, height);
              ctx.restore();
            }
          }]}
        />
      </div>
      <div className="mt-4 text-sm text-slate-400">
        Comparison across coding platforms
      </div>
    </div>
  );
};

export default TotalSolvedChart;