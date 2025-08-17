import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const BASE_URL=import.meta.env.VITE_BASE_URL

const Signup = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/signup`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(res.data);
      alert("Signup successful!");
      navigate("/login"); // ✅ Navigates after signup
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="flex flex-col md:flex-row w-[90%] max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Left Side */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 items-center justify-center bg-yellow-400 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">New Here?</h2>
          <p className="text-slate-800">Already have an account?</p>
          <Link to="/login">
            <button 
              className="bg-slate-900 text-yellow-400 px-6 py-2 mt-2 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition"
            >
              Login
            </button>
          </Link>
        </div>

        {/* Right Side (Form) */}
        <div className="md:w-1/2 w-full p-8 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-slate-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-slate-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-slate-900 py-2 rounded-md mt-4 hover:bg-yellow-500 font-semibold transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
