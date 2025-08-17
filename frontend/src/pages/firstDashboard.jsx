import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsDashboard from './StatsDashboard.jsx';
const BASE_URL=import.meta.env.VITE_BASE_URL;
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Step 1: Fetch the user profile to get the username
        const profileResponse = await axios.get(
          `${BASE_URL}/api/v1/users/profile`,
          { withCredentials: true } // Ensures cookies are sent
        );

        const usernam = profileResponse.data.user.username;
        setUsername(usernam);

        // Step 2: Use the retrieved username to fetch user stats
        const statsResponse = await axios.get(
          `${BASE_URL}/api/v1/users/stats/${usernam}`,
          { withCredentials: true }
        );

        console.log("Stats Response:", statsResponse.data.codeforces);
        setStats(statsResponse.data);

      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-400 h-24 w-24 mb-4 animate-spin"></div>
        <p className="text-white text-xl font-semibold">
          Fetching {username ? `${username}'s` : 'user'} stats...
        </p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-white text-center">Error loading stats.</div>;
  }

  if (!stats.leetcode && !stats.codeforces && !stats.codechef && !stats.gfg) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">No data available.</p>
      </div>
    );
  }

  return (
    <StatsDashboard
      username={username}
      leetcode={stats.leetcode}
      codechef={stats.codechef}
      codeforces={stats.codeforces}
      gfg={stats.gfg}
    />
  );
};

export default Dashboard;
