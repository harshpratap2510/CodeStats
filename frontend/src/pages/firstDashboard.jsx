// src/pages/firstDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsDashboard from './StatsDashboard';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FirstDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState({
    leetcode: null,
    codechef: null,
    codeforces: null,
    gfg: null,
  });

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        // 1) Get current user (to know username/handles)
        const me = await axios.get(`${BASE_URL}/api/v1/users/profile`, { withCredentials: true });
        if (!isMounted) return;

        const u = me?.data?.user?.username || '';
        setUsername(u);

        if (!u) {
          // not logged in or no username – let StatsDashboard show prompt
          setStats({ leetcode: null, codechef: null, codeforces: null, gfg: null });
          setLoading(false);
          return;
        }

        // 2) Try combined stats endpoint first
        try {
          const all = await axios.get(`${BASE_URL}/api/v1/users/stats/${u}`, { withCredentials: true });
          if (!isMounted) return;

          const { leetcode = null, codechef = null, codeforces = null, gfg = null } = all.data || {};
          setStats({ leetcode, codechef, codeforces, gfg });
        } catch {
          // 3) Fallback: fetch individually if combined isn’t available
          const [lc, cc, cf, gg] = await Promise.allSettled([
            axios.get(`${BASE_URL}/api/v1/users/stats/leetcode/${u}`, { withCredentials: true }),
            axios.get(`${BASE_URL}/api/v1/users/stats/codechef/${u}`, { withCredentials: true }),
            axios.get(`${BASE_URL}/api/v1/users/stats/codeforces/${u}`, { withCredentials: true }),
            axios.get(`${BASE_URL}/api/v1/users/stats/gfg/${u}`, { withCredentials: true }),
          ]);

          if (!isMounted) return;

          setStats({
            leetcode: lc.status === 'fulfilled' ? lc.value.data : null,
            codechef: cc.status === 'fulfilled' ? cc.value.data : null,
            codeforces: cf.status === 'fulfilled' ? cf.value.data : null,
            gfg: gg.status === 'fulfilled' ? gg.value.data : null,
          });
        }
      } catch {
        // Not logged in or profile fetch failed – show prompt
        if (!isMounted) return;
        setUsername('');
        setStats({ leetcode: null, codechef: null, codeforces: null, gfg: null });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-yellow-400/30"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-yellow-300">
        Fetching your competitive stats...
      </p>
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

export default FirstDashboard;
