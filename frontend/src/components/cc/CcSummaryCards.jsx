import React from "react";
import { Star, TrendingUp, ShieldCheck, Trophy, Users } from "lucide-react";

const CcSummaryCards = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    {
      id: 'profile',
      icon: (
        <img
          src={summary.avatar || "/default-avatar.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-red-400 object-cover"
        />
      ),
      title: summary.handle,
      value: summary.rank,
      subValue: summary.organization || summary.country,
      className: "md:col-span-2"
    },
    {
      id: 'rating',
      icon: <Star className="w-6 h-6 text-red-400" />,
      title: "Rating",
      value: summary.rating || "—",
      trend: summary.ratingChange || 0
    },
    {
      id: 'maxRating',
      icon: <TrendingUp className="w-6 h-6 text-red-400" />,
      title: "Max Rating",
      value: summary.maxRating || "—",
      trend: "peak"
    },
    {
      id: 'globalRank',
      icon: <Trophy className="w-6 h-6 text-red-400" />,
      title: "Global Rank",
      value: summary.globalRank ? `#${summary.globalRank}` : "—",
      trend: summary.globalRankChange || 0
    },
    {
      id: 'countryRank',
      icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
      title: "Country Rank",
      value: summary.countryRank ? `#${summary.countryRank}` : "—",
      trend: summary.countryRankChange || 0
    },
    {
      id: 'contribution',
      icon: <Users className="w-6 h-6 text-red-400" />,
      title: "Contribution",
      value: summary.contribution || 0
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-red-400/10 hover:border-red-400/30 ${
            card.className || ""
          }`}
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -inset-1 bg-red-400/10 blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            {card.id === 'profile' ? (
              <div className="text-center">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-500">
                  {card.title}
                </h3>
                <p className="text-sm text-red-400 italic mt-1">{card.value}</p>
                <p className="text-xs text-slate-400 mt-1">{card.subValue}</p>
              </div>
            ) : (
              <div className="text-center flex-1 flex flex-col">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {card.icon}
                  <h3 className="text-lg font-semibold text-slate-200">{card.title}</h3>
                </div>
                <p className="text-3xl font-bold text-red-400 my-2">{card.value}</p>
                {card.trend !== 0 && (
                  <p className="text-xs text-slate-400 mt-auto">
                    {typeof card.trend === 'number' && card.trend > 0 ? '+' : ''}
                    {card.trend !== "peak" ? card.trend : 'Peak Rating'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CcSummaryCards;