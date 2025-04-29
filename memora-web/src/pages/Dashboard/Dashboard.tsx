import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Games from './Games'
import Settings from './Settings'
import Profile from './Profile'

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 768 ) {
      setIsMobileOpen(prev => !prev); // Open drawer on mobile
    } else {
      setCollapsed(prev => !prev); // Normal collapse on desktop
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 bg-[#F7FAF8]">
        <SideBar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main
          className={`transition-all duration-300 p-4 w-full bg-[#F7FAF8] 
            ${collapsed ? 'ml-16' : 'ml-[20%]'}`}
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
