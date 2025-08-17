import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/user-status`, {
        withCredentials: true,
      });

      if (res.data && res.data.ok) {
        setIsLoggedIn(true);
        setIsAdmin(res.data.isAdmin || false); // assuming your response includes isAdmin
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

 const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/api/v1/users/logout`, {}, { 
      withCredentials: true 
    });
    setIsLoggedIn(false); // your state setter
    navigate('/login');
  } catch (err) {
    console.error('Logout error:', err);
  }
};

  const navItems = [
    ...(!isLoggedIn ? [{ label: 'Home', path: '/' }] : []),
    ...(isLoggedIn ? [{ label: 'Dashboard', path: '/stats' }] : []),
    ...(isLoggedIn ? [{ label: 'Profile', path: '/profile' }] : []),
  ];

  return (
    <nav className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-400">CodeStats</h1>

        <ul className="flex space-x-8 items-center">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`text-lg font-medium transition-all duration-200 
                  ${
                    location.pathname === path
                      ? 'text-yellow-300 underline underline-offset-4'
                      : 'text-white hover:text-yellow-400'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {!isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className={`text-lg font-medium transition-all duration-200 
                  ${
                    location.pathname === '/login'
                      ? 'text-yellow-300 underline underline-offset-4'
                      : 'text-white hover:text-yellow-400'
                  }`}
              >
                Login/Signup
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 text-lg font-medium transition-all duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
