import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/login.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import FirstDashboard from './pages/firstDashboard.jsx'
import GfgProfile from './components/gfg/GfgProfile.jsx'
import CodeforcesPage from './pages/CodeforcesPage.jsx'
import LeetcodePage from './pages/LeetcodePage.jsx'
import CodechefPage from './pages/CodechefPage.jsx'
import FriendStatsDashboard from './pages/FriendStatsDashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<FirstDashboard />} />
          <Route path="/stats/:username" element={<FriendStatsDashboard />} />
          <Route path="/gfg-profile/:gfgUserId" element={<GfgProfile />} />
          <Route path="/codeforces-profile/:cfUserId" element={<CodeforcesPage />} />
          <Route path="/leetcode-profile/:username" element={<LeetcodePage />} />
          <Route path="/codechef-profile/:username" element={<CodechefPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
