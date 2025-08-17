import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import TotalSolvedChart from '../components/TotalSolvedChart';
import DifficultyChart from '../components/DifficultyChart';
import CodeforcesRatingChart from '../components/CodeforcesRatingChart';
const BASE_URL=import.meta.env.VITE_BASE_URL

const FriendStatsDashboard = () => {
  const { username } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/api/v1/users/stats/${username}`,
          { withCredentials: true }
        );
        setStats(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load user stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-yellow-400/30"></div>
          <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-yellow-300">
          Fetching {username}'s competitive stats...
        </p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-red-300 mt-4">Error Loading Data</h2>
          <p className="text-slate-300 mt-2">{error || "Could not fetch profile data"}</p>
          <Link 
            to="/" 
            className="mt-4 inline-block px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const { leetcode, codechef, codeforces, gfg } = stats;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              {username}'s Competitive Dashboard
            </h1>
            <p className="text-lg text-slate-400 mt-1">Overview of all coding platforms</p>
          </div>
          {leetcode?.totalSolved && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2 mt-4 md:mt-0">
              <p className="text-xs text-yellow-300">Total Problems Solved</p>
              <p className="text-xl font-bold text-yellow-400">{leetcode.totalSolved}</p>
            </div>
          )}
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Link to={`/leetcode-profile/${username}`} className="hover:scale-[1.02] transition-transform">
            <ProfileCard platform="LeetCode" data={leetcode} />
          </Link>
          <Link to={`/codechef-profile/${username}`} className="hover:scale-[1.02] transition-transform">
            <ProfileCard platform="CodeChef" data={codechef} />
          </Link>
          <Link to={`/codeforces-profile/${username}`} className="hover:scale-[1.02] transition-transform">
            <ProfileCard platform="Codeforces" data={codeforces} />
          </Link>
          <Link to={`/gfg-profile/${username}`} className="hover:scale-[1.02] transition-transform">
            <ProfileCard platform="GeeksForGeeks" data={gfg} />
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
            <TotalSolvedChart
              leetcode={leetcode}
              codechef={codechef}
              codeforces={codeforces}
              gfg={gfg}
            />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
            <DifficultyChart LeetCode={leetcode} />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
            <CodeforcesRatingChart codeforces={codeforces} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendStatsDashboard;