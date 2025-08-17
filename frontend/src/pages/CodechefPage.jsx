import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CcSummaryCards from "../components/cc/CcSummaryCards";
import CodechefRatingChart from "../components/cc/CodechefRatingChart";
import CodechefHeatmap from "../components/cc/CodechefHeatmap";
import CcRankingGraph from "../components/cc/CcRankingGraph";

const CodechefPage = () => {
  const { username } = useParams();
  const [codechefData, setCodechefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/v1/users/codechef-profile/${username}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error(`Backend responded ${res.status}`);
        }

        const data = await res.json();
        setCodechefData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching CodeChef data:", err);
        setError("Failed to load CodeChef profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-red-400/30"></div>
          <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-red-400 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-red-300">
          Fetching {username}'s CodeChef stats...
        </p>
      </div>
    );
  }

  if (error || !codechefData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-red-300 mt-4">Error Loading Data</h2>
          <p className="text-slate-300 mt-2">{error || "Could not fetch profile data"}</p>
        </div>
      </div>
    );
  }

  const summary = {
    avatar:
      codechefData.profile ||
      codechefData.avatar ||
      codechefData.imageUrl ||
      "",
    handle:
      codechefData.username ||
      codechefData.name ||
      codechefData.user_handle ||
      "",
    rating:
      codechefData.currentRating ||
      codechefData.rating ||
      codechefData.stars ||
      null,
    maxRating:
      codechefData.highestRating ||
      codechefData.maxRating ||
      null,
    globalRank:
      codechefData.globalRank ||
      codechefData.rank ||
      null,
    countryRank:
      codechefData.countryRank ||
      null,
    contribution:
      codechefData.contribution || 0,
    friendOfCount:
      codechefData.friendOfCount || 0,
    rank:
      (codechefData.stars && codechefData.countryName)
        ? `${codechefData.stars} (${codechefData.countryName})`
        : codechefData.stars || codechefData.rank || "",
    country:
      codechefData.countryName || codechefData.country || "",
    organization:
      codechefData.organization || "",
  };

  const ratingData =
    codechefData.ratingData ||
    codechefData.contestDetails ||
    codechefData.contests ||
    [];

  const heatmap =
    codechefData.heatMap ||
    codechefData.heatmap ||
    codechefData.submissionCalendar ||
    [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-200">
              CodeChef Profile Analysis
            </h1>
            <p className="text-lg text-slate-400 mt-1">@{username}</p>
          </div>
          {summary.rating && (
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2 mt-4 md:mt-0">
              <p className="text-xs text-red-300">Current Rating</p>
              <p className="text-xl font-bold text-red-400">{summary.rating}</p>
            </div>
          )}
        </div>

        <CcSummaryCards summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
            <CodechefRatingChart ratingData={ratingData} />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
            <CcRankingGraph ratingData={ratingData} />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
          <CodechefHeatmap contestHistory={heatmap} />
        </div>
      </div>
    </div>
  );
};

export default CodechefPage;