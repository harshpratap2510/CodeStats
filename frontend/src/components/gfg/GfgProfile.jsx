// GfgProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SummaryCards from "./SummaryCards.jsx";
import GFGDifficultyChart from "./GFGDifficultyChart.jsx";
import DifficultyBarChart from "./DifficultyBarChart.jsx";
import ProblemTable from "./ProblemTable.jsx";
import Navbar from "../Navbar.jsx";
const BASE_URL=import.meta.env.VITE_BASE_URL

const GfgProfile = () => {
  const { gfgUserId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/api/v1/users/gfg-profile/${gfgUserId}`,{withCredentials: true}
        );
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching GFG data:", err);
        setError("Failed to load GeeksforGeeks profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [gfgUserId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-green-400/30"></div>
          <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-green-400 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-green-300">
          Fetching {gfgUserId}'s GeeksforGeeks stats...
        </p>
      </div>
    );
  }

  if (error || !data) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">
              GeeksforGeeks Profile Analysis
            </h1>
            <p className="text-lg text-slate-400 mt-1">@{gfgUserId}</p>
          </div>
          {data.info?.codingScore && (
            <div className="bg-green-400/10 border border-green-400/30 rounded-lg px-4 py-2 mt-4 md:mt-0">
              <p className="text-xs text-green-300">Coding Score</p>
              <p className="text-xl font-bold text-green-400">{data.info.codingScore}</p>
            </div>
          )}
        </div>

        <SummaryCards info={data.info} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
            <GFGDifficultyChart solvedStats={data.solvedStats} />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
            <DifficultyBarChart solvedStats={data.solvedStats} />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg">
          <ProblemTable solvedStats={data.solvedStats} />
        </div>
      </div>
    </div>
  );
};

export default GfgProfile;