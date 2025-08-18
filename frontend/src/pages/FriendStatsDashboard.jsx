import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import TotalSolvedChart from '../components/TotalSolvedChart';
import DifficultyChart from '../components/DifficultyChart';
import CodeforcesRatingChart from '../components/CodeforcesRatingChart';
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  // Check which platforms are available
  const platformStatus = {
    leetcode: !!leetcode?.matchedUser?.username,
    codechef: !!codechef?.name,
    codeforces: !!codeforces?.handle,
    gfg: !!gfg?.info?.userName
  };

  const handlePlatformClick = (platform) => {
    if (!platformStatus[platform]) {
      window.alert(`${username} hasn't added their ${platform} profile yet`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          {username}'s Competitive Dashboard
        </h1>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* LeetCode */}
          {platformStatus.leetcode ? (
            <Link
              to={`/leetcode-profile/${username}`}
              className="block hover:scale-105 transition-transform"
            >
              <ProfileCard platform="LeetCode" data={leetcode} isAvailable />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handlePlatformClick('leetcode')}
              className="block text-left hover:scale-105 transition-transform cursor-pointer"
            >
              <ProfileCard platform="LeetCode" data={leetcode} isAvailable={false} />
            </button>
          )}

          {/* CodeChef */}
          {platformStatus.codechef ? (
            <Link
              to={`/codechef-profile/${username}`}
              className="block hover:scale-105 transition-transform"
            >
              <ProfileCard platform="CodeChef" data={codechef} isAvailable />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handlePlatformClick('codechef')}
              className="block text-left hover:scale-105 transition-transform cursor-pointer"
            >
              <ProfileCard platform="CodeChef" data={codechef} isAvailable={false} />
            </button>
          )}

          {/* Codeforces */}
          {platformStatus.codeforces ? (
            <Link
              to={`/codeforces-profile/${username}`}
              className="block hover:scale-105 transition-transform"
            >
              <ProfileCard platform="Codeforces" data={codeforces} isAvailable />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handlePlatformClick('codeforces')}
              className="block text-left hover:scale-105 transition-transform cursor-pointer"
            >
              <ProfileCard platform="Codeforces" data={codeforces} isAvailable={false} />
            </button>
          )}

          {/* GFG */}
          {platformStatus.gfg ? (
            <Link
              to={`/gfg-profile/${username}`}
              className="block hover:scale-105 transition-transform"
            >
              <ProfileCard platform="GeeksForGeeks" data={gfg} isAvailable />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handlePlatformClick('gfg')}
              className="block text-left hover:scale-105 transition-transform cursor-pointer"
            >
              <ProfileCard platform="GeeksForGeeks" data={gfg} isAvailable={false} />
            </button>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(platformStatus.leetcode || platformStatus.codeforces || platformStatus.gfg) && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
              <TotalSolvedChart
                leetcode={platformStatus.leetcode ? leetcode : null}
                codechef={platformStatus.codechef ? codechef : null}
                codeforces={platformStatus.codeforces ? codeforces : null}
                gfg={platformStatus.gfg ? gfg : null}
              />
            </div>
          )}

          {platformStatus.leetcode && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
              <DifficultyChart LeetCode={leetcode} />
            </div>
          )}

          {platformStatus.codeforces && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-lg hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all">
              <CodeforcesRatingChart codeforces={codeforces} />
            </div>
          )}
        </div>

        {/* Prompt to add missing profiles */}
        {!Object.values(platformStatus).every(Boolean) && (
          <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 text-center">
            <p className="text-yellow-300 mb-2">
              {username} hasn't added all their competitive profiles
            </p>
            <p className="text-sm text-slate-400">
              Some charts and statistics may be limited
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendStatsDashboard;