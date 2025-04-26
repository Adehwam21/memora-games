import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Games from './Games'
import Settings from './Settings'
import Profile from './Profile'

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          className={`transition-all duration-300 p-4 w-full ${
            collapsed ? 'ml-16' : 'ml-[16.6667%]' // 1/6th width
          }`}
        >
          <Routes>
            <Route index path='home' element={<Home />} />
            <Route path="games" element={<Games />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
