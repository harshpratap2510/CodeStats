import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import TotalSolvedChart from '../components/TotalSolvedChart';
import DifficultyChart from '../components/DifficultyChart';
import CodeforcesRatingChart from '../components/CodeforcesRatingChart';
import Navbar from '../components/Navbar';

const StatsDashboard = ({ username, leetcode, codechef, codeforces, gfg }) => {
  const navigate = useNavigate();
 
  const platformStatus = {
    leetcode: !!leetcode?.matchedUser?.username,
    codechef: !!codechef?.name,
    codeforces: !!codeforces?.handle,
    gfg: !!gfg?.info?.userName
  };

  const hasAnyProfile = Object.values(platformStatus).some(Boolean);

  if (!hasAnyProfile) {
    return <AddProfilePrompt username={username} />;
  }
 
  const handlePlatformClick = (platform) => {
    if (!platformStatus[platform]) {
      const platformName = {
        leetcode: "LeetCode",
        codechef: "CodeChef",
        codeforces: "Codeforces",
        gfg: "GeeksForGeeks"
      }[platform];
      
      if (window.confirm(`${platformName} profile not found. Would you like to add it now?`)) {
        navigate('/profile');
      }
      return false;  
    }
    return true; 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          Competitive Programming Dashboard
        </h1>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => !platformStatus.leetcode && handlePlatformClick('leetcode')}
            className={`hover:scale-105 transition-transform ${!platformStatus.leetcode ? 'cursor-pointer' : ''}`}
          >
            <Link to={platformStatus.leetcode ? `/leetcode-profile/${username}` : '#'}>
              <ProfileCard 
                platform="LeetCode" 
                data={leetcode} 
                isAvailable={platformStatus.leetcode}
              />
            </Link>
          </div>
          
          <div 
            onClick={() => !platformStatus.codechef && handlePlatformClick('codechef')}
            className={`hover:scale-105 transition-transform ${!platformStatus.codechef ? 'cursor-pointer' : ''}`}
          >
            <Link to={platformStatus.codechef ? `/codechef-profile/${username}` : '#'}>
              <ProfileCard 
                platform="CodeChef" 
                data={codechef} 
                isAvailable={platformStatus.codechef}
              />
            </Link>
          </div>
          
          <div 
            onClick={() => !platformStatus.codeforces && handlePlatformClick('codeforces')}
            className={`hover:scale-105 transition-transform ${!platformStatus.codeforces ? 'cursor-pointer' : ''}`}
          >
            <Link to={platformStatus.codeforces ? `/codeforces-profile/${username}` : '#'}>
              <ProfileCard 
                platform="Codeforces" 
                data={codeforces} 
                isAvailable={platformStatus.codeforces}
              />
            </Link>
          </div>
          
          <div 
            onClick={() => !platformStatus.gfg && handlePlatformClick('gfg')}
            className={`hover:scale-105 transition-transform ${!platformStatus.gfg ? 'cursor-pointer' : ''}`}
          >
            <Link to={platformStatus.gfg ? `/gfg-profile/${username}` : '#'}>
              <ProfileCard 
                platform="GeeksForGeeks" 
                data={gfg} 
                isAvailable={platformStatus.gfg}
              />
            </Link>
          </div>
        </div>

        {/* Conditional rendering of charts based on available data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(platformStatus.leetcode || platformStatus.codeforces || platformStatus.gfg) && (
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
              <TotalSolvedChart
                leetcode={leetcode}
                codeforces={codeforces}
                codechef={codechef}
                gfg={gfg}
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

        {/* Prompt to add missing profiles */}
        {!Object.values(platformStatus).every(Boolean) && (
          <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 text-center">
            <p className="text-yellow-300 mb-2">
              Add missing profiles to unlock full dashboard features
            </p>
            <Link 
              to="/profile"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Update Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Update your ProfileCard component to accept isAvailable prop and show appropriate UI
// AddProfilePrompt remains the same as in your original code

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
            Complete Your Profile
          </h2>
          
          <p className="text-slate-300 mb-8">
            To view your comprehensive stats dashboard, please add your competitive programming 
            platform usernames to your profile. We'll use these to fetch your latest performance data.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-medium text-white mb-2">Required Information</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  LeetCode username
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Codeforces username
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  CodeChef username
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  GFG username
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-medium text-white mb-2">What You'll Get</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Comprehensive stats dashboard
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Problem difficulty analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Rating progress charts
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Comparison with friends
                </li>
              </ul>
            </div>
          </div>
          
          <Link 
            to={`/profile`}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Complete Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;