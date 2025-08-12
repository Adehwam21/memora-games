/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setGames, setStats } from '../../redux/slices/content-slice/contentSlice'; // ← updated
import API from '../../config/axiosConfig';

import SideBar from './SideBar';
import Header from './Header';
import Home from './Home';
import Games from './Games';
import Settings from './Settings';
import UserStats from './UserStats';
import { ParticipationForm } from './Participation';
import { computeStats } from '../../utils/game/dashboardUtils';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth!);
  const { games, stats } = useSelector((state: RootState) => state.content);

  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    if (isMobile) setIsMobileOpen(prev => !prev);
    else setCollapsed(prev => !prev);
  };

  const fetchAllGames = async () => {
    try {
      const response = await API.get("/game/");
      if (response.data?.games) {
        dispatch(setGames({ games: response.data.games }));
      } else {
        console.log("Couldn't fetch all games");
      }
    } catch (error) {
      console.log("Error fetching games:", error);
    }
  };

  const fetchGameStats = async () => {
    try {
      const response = await API.get(`/game-session/user/complete/${user!.userId}`);
      if (response.data?.gameSessions) {
        const userStats = computeStats(response.data.gameSessions) || []
        dispatch(setStats({ stats: userStats }));
      } else {
        console.log("Couldn't fetch stats");
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchAllGames();
    fetchGameStats();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainMargin = isMobile ? 'ml-0' : collapsed ? 'ml-16' : 'ml-[18%]';

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
        <main className={`transition-all duration-300 p-4 w-full bg-[#F7FAF8] ${mainMargin}`}>
          <Routes>
            <Route path="home" element={<Home user={user!} stats={stats! || []} games={games! || []} />} />
            <Route path="games" element={<Games games={games || []} user={user!} />} />
            <Route path="stats" element={<UserStats user={user!} stats={stats! || []} />} />
            <Route path="settings" element={<Settings user={user!} />} />
            <Route path="facilitate" element={<ParticipationForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
