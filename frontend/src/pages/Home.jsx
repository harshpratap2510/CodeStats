import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-center h-[90vh] px-10 gap-10">


        <div className="w-full md:w-1/2 text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold text-yellow-500">Welcome to the Code Friends</h1>
          <p className="text-lg text-white mt-4">From problem-solving to profile-building — stay sharp, stay social, stay coding.</p>
          <Link to="/login">
            <button className="mt-6 px-4 py-2 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-600">
              Get Started
            </button>
          </Link>

        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" // Make sure to use a *direct image URL*
            alt="Laptop"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>

        {/* Text on the right */}

      </div>
    </div>
  )
}

export default Home
