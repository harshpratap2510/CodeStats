import React from "react";
import {
  Star,
  TrendingUp,
  ShieldCheck,
  Medal,
  User,
  Globe,
  Trophy,
  Award,
} from "lucide-react";

const LcSummaryCards = ({ user }) => {
  if (!user?.matchedUser) return null;

  const { profile, submitStats, badges = [], contributions } = user.matchedUser;
  const stats = submitStats?.acSubmissionNum || [];
  
  // Calculate metrics
  const totalSolved = stats.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const totalSubmitted = stats.reduce((acc, curr) => acc + (curr.submissions || 0), 0);
  const acceptanceRate = totalSubmitted > 0 ? (totalSolved / totalSubmitted) * 100 : 0;
  const contributionPoints = contributions?.points || 0;
  const reputation = profile?.reputation || 0;

  // Metric cards configuration
  const metricCards = [
    {
      id: 'solved',
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "Total Solved",
      value: totalSolved,
      trend: stats.find(s => s.difficulty === "All")?.count || 0
    },
    {
      id: 'acceptance',
      icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
      title: "Acceptance Rate",
      value: `${acceptanceRate.toFixed(1)}%`,
      trend: acceptanceRate > 50 ? "up" : "down"
    },
    {
      id: 'badges',
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      title: "Badges Earned",
      value: badges.length,
      trend: badges.filter(b => b.displayName === "Guardian").length
    },
    {
      id: 'contributions',
      icon: <User className="w-6 h-6 text-yellow-400" />,
      title: "Contribution Points",
      value: contributionPoints,
      trend: contributionPoints > 1000 ? "high" : "low"
    },
    {
      id: 'reputation',
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
      title: "Community Reputation",
      value: reputation,
      trend: reputation > 1000 ? "high" : "low"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
      {/* Profile Card - Special Case */}
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-yellow-400/10 hover:border-yellow-400/30 md:col-span-2">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute -inset-1 bg-yellow-400/10 blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <img
            src={profile?.userAvatar || "https://leetcode.com/static/images/LeetCode_Sharing.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover mb-3"
          />
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            {user.matchedUser.username || "LeetCode User"}
          </h3>
          <p className="text-sm text-yellow-400 italic mt-1">
            {profile?.realName || "Anonymous"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {profile?.school || "Unknown Location"}
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      {metricCards.map((card) => (
        <div
          key={card.id}
          className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-yellow-400/10 hover:border-yellow-400/30"
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -inset-1 bg-yellow-400/10 blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-1">
              {card.icon}
              <h3 className="text-lg font-semibold text-slate-200">{card.title}</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400 my-2 text-center">{card.value}</p>
            {typeof card.trend === 'number' && (
              <p className="text-xs text-slate-400 mt-auto text-center">
                {card.trend} this year
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LcSummaryCards;