import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BASE_URL=import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    leetcodeHandle: '',
    codechefHandle: '',
    codeforcesHandle: '',
    gfgHandle: '',
    profilePicture: '',
  });

  const [friends, setFriends] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/profile`, {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        setFormData(res.data.user);
      }

      const friendsRes = await axios.get(`${BASE_URL}/api/v1/users/friends`, {
        withCredentials: true,
      });

      if (Array.isArray(friendsRes.data.friends)) {
        setFriends(friendsRes.data.friends);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setFriends([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BASE_URL}/api/v1/users/update-profile`,
        formData,
        { withCredentials: true }
      );
      alert('Profile updated successfully!');
      fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong!');
    }
  };

  const handleAddFriend = async () => {
    if (!newFriendUsername.trim()) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/users/friends/search?key=${newFriendUsername}`,
        { withCredentials: true }
      );

      const matchedUser = res.data[0];
      if (!matchedUser) {
        alert("User not found");
        return;
      }

      await axios.post(
        `${BASE_URL}/api/v1/users/friends/${matchedUser._id}`,
        {},
        { withCredentials: true }
      );

      fetchUserData();
      setNewFriendUsername('');
    } catch (err) {
      console.error(err);
      alert("Could not add friend");
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/users/friends/${friendId}`, {
        withCredentials: true,
      });
      fetchUserData();
    } catch (error) {
      console.error('Error removing friend:', error);
      alert('Failed to remove friend.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-slate-800 rounded-2xl shadow-xl">
            <div className="relative group">
              <img
                src={formData.profilePicture || '/user (1).png'}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-yellow-300 opacity-0 group-hover:opacity-100 transition-all"></div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                {formData.username}
              </h1>
              <p className="text-slate-300 mt-1">{formData.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {['leetcode', 'codechef', 'codeforces', 'gfg'].map((platform) => (
                  formData[`${platform}Handle`] && (
                    <span key={platform} className="px-3 py-1 bg-slate-700 rounded-full text-xs font-medium flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      {platform}: {formData[`${platform}Handle`]}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-700 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-400 hover:text-white'}`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 font-medium ${activeTab === 'friends' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-400 hover:text-white'}`}
            >
              Friends ({friends.length})
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 text-yellow-400">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'username', label: 'Username', type: 'text' },
                    { id: 'email', label: 'Email', type: 'email' },
                    { id: 'leetcodeHandle', label: 'LeetCode', type: 'text' },
                    { id: 'codechefHandle', label: 'CodeChef', type: 'text' },
                    { id: 'codeforcesHandle', label: 'CodeForces', type: 'text' },
                    { id: 'gfgHandle', label: 'GeeksforGeeks', type: 'text' },
                    { id: 'profilePicture', label: 'Profile Picture URL', type: 'url', colSpan: 'md:col-span-2' },
                  ].map((field) => (
                    <div key={field.id} className={`flex flex-col ${field.colSpan || ''}`}>
                      <label htmlFor={field.id} className="text-sm font-medium text-slate-300 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ''}
                        onChange={handleChange}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-300 transition transform hover:-translate-y-0.5 shadow-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold text-yellow-400">Your Friends</h2>
                  <div className="flex w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search friends..."
                      value={newFriendUsername}
                      onChange={(e) => setNewFriendUsername(e.target.value)}
                      className="bg-slate-700 border border-slate-600 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition flex-grow"
                    />
                    <button
                      onClick={handleAddFriend}
                      className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition whitespace-nowrap"
                    >
                      Add Friend
                    </button>
                  </div>
                </div>

                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-slate-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-300">No friends yet</h3>
                    <p className="text-slate-500 mt-1">Add friends to see their coding progress</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map((friend) => (
                      <div key={friend._id} className="bg-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-600 transition group">
                        <Link
                          to={`/stats/${friend.username}`}
                          className="flex items-center space-x-3 flex-grow"
                        >
                          <img
                            src={friend.profilePicture || '/user (1).png'}
                            alt={friend.username}
                            className="w-10 h-10 rounded-full border-2 border-yellow-400"
                          />
                          <span className="font-medium text-white group-hover:text-yellow-300 transition">
                            {friend.username}
                          </span>
                        </Link>
                        <button
                          onClick={() => handleRemoveFriend(friend._id)}
                          className="text-slate-400 hover:text-red-400 transition p-1"
                          title="Remove friend"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;