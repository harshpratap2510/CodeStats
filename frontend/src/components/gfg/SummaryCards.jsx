// SummaryCards.jsx
import React from "react";
import { BarChart, Flame, Trophy, Target, Activity } from "lucide-react";

const SummaryCards = ({ info }) => {
  if (!info) return null;

  const cards = [
    {
      id: 'profile',
      icon: (
        <img
          src={info.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
        />
      ),
      title: info.fullName || "GFG User",
      value: info.userName || "",
      subValue: info.institute || "",
      className: "md:col-span-2"
    },
    {
      id: 'codingScore',
      icon: <BarChart className="w-6 h-6 text-green-400" />,
      title: "Coding Score",
      value: info.codingScore || "—"
    },
    {
      id: 'monthlyScore',
      icon: <Target className="w-6 h-6 text-green-400" />,
      title: "Monthly Score",
      value: info.monthlyScore || "—"
    },
    {
      id: 'problemsSolved',
      icon: <Flame className="w-6 h-6 text-green-400" />,
      title: "Problems Solved",
      value: info.totalProblemsSolved || 0
    },
    {
      id: 'currentStreak',
      icon: <Activity className="w-6 h-6 text-green-400" />,
      title: "Current Streak",
      value: info.currentStreak || 0,
      unit: "days"
    },
    {
      id: 'maxStreak',
      icon: <Flame className="w-6 h-6 text-green-400" />,
      title: "Max Streak",
      value: info.maxStreak || 0,
      unit: "days"
    },
    {
      id: 'instituteRank',
      icon: <Trophy className="w-6 h-6 text-green-400" />,
      title: "Institute Rank",
      value: info.instituteRank ? `#${info.instituteRank}` : "—"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-green-400/10 hover:border-green-400/30 ${
            card.className || ""
          }`}
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -inset-1 bg-green-400/10 blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            {card.id === 'profile' ? (
              <div className="text-center">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500">
                  {card.title}
                </h3>
                <p className="text-sm text-green-400 italic mt-1">@{card.value}</p>
                <p className="text-xs text-slate-400 mt-1">{card.subValue}</p>
              </div>
            ) : (
              <div className="text-center flex-1 flex flex-col">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {card.icon}
                  <h3 className="text-lg font-semibold text-slate-200">{card.title}</h3>
                </div>
                <p className="text-3xl font-bold text-green-400 my-2">{card.value}</p>
                {card.unit && (
                  <p className="text-xs text-slate-400 mt-auto">{card.unit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;