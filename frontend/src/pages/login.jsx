import React, { useState } from 'react';
import api from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/api/v1/users/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Refresh user in context, then go to dashboard
      await refresh();
      alert('Login successful!');
      navigate('/stats');
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="flex flex-col md:flex-row w-[90%] max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white">
          {/* Left Side */}
          <div className="md:w-1/2 w-full flex flex-col gap-4 items-center justify-center bg-yellow-400 p-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">New Here?</h2>
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className="bg-slate-900 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                Signup
              </button>
            </Link>
          </div>

          {/* Right Side (Form) */}
          <div className="md:w-1/2 w-full p-8 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-slate-700 font-medium">Email/Username</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email/username"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-slate-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 text-slate-900 py-2 rounded-md mt-4 hover:bg-yellow-500 font-semibold transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
