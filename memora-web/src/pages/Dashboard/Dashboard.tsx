import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Games, { IGame } from './Games'
import Settings from './Settings'
import Profile from './Profile'
import API from '../../config/axiosConfig'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ParticipationForm } from './Participation'

const Dashboard: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.auth!)
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(prev => !prev);
    } else {
      setCollapsed(prev => !prev);
    }
  };

  const fetchAllGames = async () => {
    try {
      const response = await API.get("/game/");
      if (response?.data?.games) {
        setGames(response.data.games);
      } else {
        console.log("Couldn't fetch all games");
      }
    } catch (error) {
      console.log("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainMargin = isMobile ? 'ml-0' : collapsed ? 'ml-16' : 'ml-[21%]';

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
          className={`transition-all duration-300 p-4 w-full bg-[#F7FAF8] ${mainMargin}`}
        >
          <Routes>
            <Route path="home" element={<Home user={user!} />} />
            <Route path="games" element={<Games games={games || []} />} />
            <Route path="profile" element={<Profile user={user!} />} />
            <Route path="settings" element={<Settings />} />
            <Route path="facilitate" element={<ParticipationForm/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
