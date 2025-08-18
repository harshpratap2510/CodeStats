import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

const Navbar = () => {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/users/logout', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout error:', err?.response?.status || err?.message);
    } finally {
      setUser(null);
      navigate('/login');
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
                className={`text-lg font-medium transition-all duration-200 ${
                  location.pathname === path
                    ? 'text-yellow-300 underline underline-offset-4'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {loading ? (
            <li className="text-slate-300 text-sm">Loading…</li>
          ) : !isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className={`text-lg font-medium transition-all duration-200 ${
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
