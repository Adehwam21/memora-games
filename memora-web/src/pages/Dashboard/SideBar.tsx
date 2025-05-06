import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { LuBrain } from "react-icons/lu";
import { MdOutlineAssessment } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";
import { BsCollectionPlay } from "react-icons/bs";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

const sections = [
  { link: "/dashboard/home", name: "Home", icon: <GrHomeRounded size={20}/> },
  { link: "/dashboard/games", name: "Games", icon: <BsCollectionPlay size={20}/> },
  { link: "/dashboard/training", name: "Training", icon: <CgGym/> },
  { link: "/dashboard/assessment", name: "Assess", icon: <MdOutlineAssessment/> },
  { link: "/dashboard/profile", name: "Profile", icon: <LuBrain /> },
]

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed, isMobileOpen, setIsMobileOpen }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false); // Close mobile drawer if resizing to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileOpen]);

  const sidebarWidth = collapsed ? 'w-18' : 'w-48 min-w-[19%]';

  const sidebarClasses = `
    fixed top-19 left-0 h-full bg-base-100 shadow-sm transition-all duration-500 ease-in-out 
    ${isMobile ? 'w-18' : sidebarWidth}
    ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : ''}
    ${isMobile ? 'z-50' : ''}
  `;

  return (
    <aside>
      <div className={sidebarClasses}>
        {/* Nav */}
        <ul>
          {sections.map((item, index) => (
            <NavLink 
              key={index}
              to={item.link} 
              onClick={() => { if (isMobile) setIsMobileOpen(false); }} // Close on mobile when link clicked
              className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center p-4' : 'gap-4 p-6'} 
                  transition-all duration-200 hover:bg-base-200 ${
                  isActive ? 'text-green-700 font-bold bg-base-200' : ''
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              {!collapsed && !isMobile && <span className="text-base">{item.name}</span>}
            </NavLink>
          ))}
        </ul>

        {/* Collapse Button (Desktop only) */}
        {!isMobile && (
          <div className="hidden md:block absolute top-8/10 -right-4 transform -translate-y-1/2">
            <button
              className="btn bg-green-700 btn-sm btn-circle shadow-md border"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaChevronLeft className={` text-white font-bold transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Backdrop when mobile sidebar is open */}
      {isMobile && isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/80"
        ></div>
      )}
    </aside>
  )
}

export default SideBar
