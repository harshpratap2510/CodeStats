import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import TotalSolvedChart from '../components/TotalSolvedChart';
import DifficultyChart from '../components/DifficultyChart';
import CodeforcesRatingChart from '../components/CodeforcesRatingChart';
import Navbar from '../components/Navbar';

const hasValidData = (data) => {
  if (!data) return false;
  if (data.error) return false;
  return true;
};

const isProfileAvailable = {
  leetcode: (data) => hasValidData(data) && (data.username || data.handle || data.matchedUser?.username),
  codechef: (data) => hasValidData(data) && (data.username || data.name || data.handle),
  codeforces: (data) => hasValidData(data) && data.handle,
  gfg: (data) => hasValidData(data) && data.info?.userName,
};

const StatsDashboard = ({ username, leetcode, codechef, codeforces, gfg }) => {
  const navigate = useNavigate();

  // Check platform availability
  const platformStatus = {
    leetcode: isProfileAvailable.leetcode(leetcode),
    codechef: isProfileAvailable.codechef(codechef),
    codeforces: isProfileAvailable.codeforces(codeforces),
    gfg: isProfileAvailable.gfg(gfg),
  };

  // Check if we have at least one valid profile
  const hasAnyProfile = Object.values(platformStatus).some(Boolean);

  // If no profiles exist at all, show the AddProfilePrompt
  if (!hasAnyProfile) {
    return <AddProfilePrompt username={username} />;
  }

  const handlePlatformClick = (platform) => {
    if (!platformStatus[platform]) {
      const platformName = {
        leetcode: 'LeetCode',
        codechef: 'CodeChef',
        codeforces: 'Codeforces',
        gfg: 'GeeksForGeeks'
      }[platform];
      
      if (window.confirm(`${username} hasn't added their ${platformName} profile. Would you like to add yours now?`)) {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          {username}'s Competitive Dashboard
        </h1>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div onClick={() => handlePlatformClick('leetcode')} className="hover:scale-105 transition-transform">
            <ProfileCard 
              platform="LeetCode" 
              data={leetcode} 
              isAvailable={platformStatus.leetcode}
            />
          </div>
          
          <div onClick={() => handlePlatformClick('codechef')} className="hover:scale-105 transition-transform">
            <ProfileCard 
              platform="CodeChef" 
              data={codechef} 
              isAvailable={platformStatus.codechef}
            />
          </div>
          
          <div onClick={() => handlePlatformClick('codeforces')} className="hover:scale-105 transition-transform">
            <ProfileCard 
              platform="Codeforces" 
              data={codeforces} 
              isAvailable={platformStatus.codeforces}
            />
          </div>
          
          <div onClick={() => handlePlatformClick('gfg')} className="hover:scale-105 transition-transform">
            <ProfileCard 
              platform="GeeksForGeeks" 
              data={gfg} 
              isAvailable={platformStatus.gfg}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(platformStatus.leetcode || platformStatus.codeforces || platformStatus.gfg) && (
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
              <TotalSolvedChart
                leetcode={platformStatus.leetcode ? leetcode : null}
                codechef={platformStatus.codechef ? codechef : null}
                codeforces={platformStatus.codeforces ? codeforces : null}
                gfg={platformStatus.gfg ? gfg : null}
              />
            </div>
          )}

          {platformStatus.leetcode && (
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
              <DifficultyChart LeetCode={leetcode} />
            </div>
          )}

          {platformStatus.codeforces && (
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg lg:col-span-2">
              <CodeforcesRatingChart codeforces={codeforces} />
            </div>
          )}
        </div>

        {/* Missing profiles notice */}
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

const AddProfilePrompt = ({ username }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="max-w-2xl bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Profile Not Found
          </h2>
          
          <p className="text-slate-300 mb-8">
            {username} hasn't added any competitive programming profiles yet.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;