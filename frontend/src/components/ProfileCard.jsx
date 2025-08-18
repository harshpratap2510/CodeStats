import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ platform, data, isAvailable = true }) => {
  const normalizedPlatform = platform.toLowerCase();

  const platformData = {
    leetcode: {
      name: "LeetCode",
      color: "bg-orange-500/10 border-orange-500/50",
      hoverColor: "hover:shadow-orange-500/20 hover:border-orange-500/70",
      icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png",
      username: data?.handle ?? data?.username ?? data?.profile?.userSlug ?? data?.matchedUser?.username ?? "Not set",
      avatar: data?.avatar ?? data?.profile?.userAvatar ?? data?.matchedUser?.profile?.userAvatar ?? "/user (1).png",
      stats: [
        { label: "Solved", value: getLeetcodeSolved(data) },
        { label: "Rank", value: data?.ranking ?? data?.profile?.ranking ?? data?.matchedUser?.profile?.ranking ?? "—" }
      ]
    },
    codeforces: {
      name: "Codeforces",
      color: "bg-blue-500/10 border-blue-500/50",
      hoverColor: "hover:shadow-blue-500/20 hover:border-blue-500/70",
      icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-codeforces-programming-competitions-and-contests-programming-community-logo-shadow-tal-revivo.png",
      username: data?.handle ?? "Not set",
      avatar: data?.avatar ?? "/user (1).png",
      stats: [
        { label: "Rating", value: data?.rating ?? "—" },
        { label: "Rank", value: data?.rank ?? "—" }
      ]
    },
    codechef: {
      name: "CodeChef",
      color: "bg-red-500/10 border-red-500/50",
      hoverColor: "hover:shadow-red-500/20 hover:border-red-500/70",
      icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-codechef-online-programming-competition-and-community-logo-shadow-tal-revivo.png",
      username: data?.username ?? data?.name ?? "Not set",
      avatar: data?.profile ?? data?.avatar ?? "/user (1).png",
      stats: [
        { label: "Rating", value: data?.currentRating ?? data?.rating ?? "—" },
        { label: "Stars", value: data?.stars ?? "—" }
      ]
    },
    geeksforgeeks: {
      name: "GeeksForGeeks",
      color: "bg-green-500/10 border-green-500/50",
      hoverColor: "hover:shadow-green-500/20 hover:border-green-500/70",
      icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
      username: data?.info?.userName ?? "Not set",
      avatar: data?.info?.profilePicture ?? "/user (1).png",
      stats: [
        { label: "Solved", value: data?.info?.totalProblemsSolved ?? "—" },
        { label: "Score", value: data?.info?.codingScore ?? "—" }
      ]
    }
  };

  const currentPlatform = platformData[normalizedPlatform] || platformData.leetcode;

  function getLeetcodeSolved(data) {
    if (!data) return "—";
    if (typeof data?.submitStats?.totalSolved === "number") return data.submitStats.totalSolved;
    const ac = data?.matchedUser?.submitStats?.acSubmissionNum;
    if (Array.isArray(ac)) {
      const all = ac.find(x => x?.difficulty === "All")?.count;
      return typeof all === "number" ? all : 
        (ac.find(x => x?.difficulty === "Easy")?.count || 0) +
        (ac.find(x => x?.difficulty === "Medium")?.count || 0) +
        (ac.find(x => x?.difficulty === "Hard")?.count || 0);
    }
    return data?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.count || 0;
  }

  return (
    <div className={`relative rounded-xl border p-5 transition-all ${currentPlatform.color} ${
      isAvailable ? `${currentPlatform.hoverColor} hover:scale-[1.02] hover:shadow-lg` : 'opacity-80 border-dashed'
    }`}>
      {/* Add Profile overlay for unavailable platforms */}
      {!isAvailable && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/80 rounded-xl z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-center text-yellow-300 font-medium">Profile Not Added</p>
          <Link 
            to="/profile" 
            className="mt-1 px-3 py-1 text-xs bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 transition-colors"
          >
            Add Now
          </Link>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={currentPlatform.avatar}
            alt={`${currentPlatform.name} avatar`}
            onError={(e) => (e.currentTarget.src = "/user (1).png")}
            className={`w-14 h-14 rounded-full border-2 object-cover ${
              isAvailable ? "border-white/20" : "border-slate-600/50"
            }`}
          />
          <div className={`absolute -bottom-1 -right-1 rounded-full p-1 border ${
            isAvailable ? "bg-slate-800 border-slate-600" : "bg-slate-700/50 border-slate-600/50"
          }`}>
            <img 
              src={currentPlatform.icon} 
              alt={currentPlatform.name} 
              className="w-4 h-4 object-contain" 
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold truncate ${
            isAvailable ? "text-white" : "text-slate-400"
          }`}>{currentPlatform.name}</h3>
          <p className={`text-sm truncate ${
            isAvailable ? "text-slate-300" : "text-slate-500"
          }`}>@{currentPlatform.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {currentPlatform.stats.map((stat, index) => (
          <div 
            key={index} 
            className={`rounded-lg p-2 text-center ${
              isAvailable ? "bg-slate-800/30" : "bg-slate-800/10"
            }`}
          >
            <p className={`text-xs ${
              isAvailable ? "text-slate-400" : "text-slate-500"
            }`}>{stat.label}</p>
            <p className={`font-semibold ${
              isAvailable ? "text-white" : "text-slate-400"
            }`}>{isAvailable ? stat.value : "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;