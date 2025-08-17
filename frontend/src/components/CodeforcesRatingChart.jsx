import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CodeforcesRatingChart = ({ codeforces }) => {
  if (!codeforces || !codeforces.solvedByRating) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-blue-400/10 hover:border-blue-400/30 transition-all flex items-center justify-center">
        <p className="text-slate-400">No Codeforces rating data available</p>
      </div>
    );
  }

  const solvedByRating = codeforces.solvedByRating;
  const labels = Object.keys(solvedByRating).sort((a, b) => Number(a) - Number(b));
  const values = labels.map(rating => solvedByRating[rating]);

  const getColorForRating = (rating) => {
    const numRating = Number(rating);
    if (numRating < 1200) return 'rgba(158, 158, 158, 0.8)'; // Gray
    if (numRating < 1400) return 'rgba(0, 188, 212, 0.8)'; // Cyan
    if (numRating < 1600) return 'rgba(76, 175, 80, 0.8)'; // Green
    if (numRating < 1900) return 'rgba(67, 160, 71, 0.8)'; // Blue
    if (numRating < 2100) return 'rgba(171, 71, 188, 0.8)'; // Purple
    if (numRating < 2400) return 'rgba(255, 193, 7, 0.8)'; // Yellow
    return 'rgba(244, 67, 54, 0.8)'; // Red
  };

  const data = {
    labels,
    datasets: [{
      label: "Problems Solved",
      data: values,
      backgroundColor: labels.map(rating => getColorForRating(rating)),
      borderColor: 'rgba(30, 41, 59, 0.8)',
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: labels.map(rating => getColorForRating(rating).replace('0.8', '1')),
      barPercentage: 0.8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F8FAFC',
        bodyColor: '#E2E8F0',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.raw}`;
          },
          title: (context) => {
            return `Rating: ${context[0].label}`;
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
          stepSize: Math.max(1, Math.round(Math.max(...values) / 5))
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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-blue-400/10 hover:border-blue-400/30 transition-all h-full">
      <h3 className="text-xl font-bold mb-4 text-blue-400">
        Codeforces Solved by Rating
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
    </div>
  );
};

export default CodeforcesRatingChart;